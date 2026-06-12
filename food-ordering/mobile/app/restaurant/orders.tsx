import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client, { getBaseURL } from '../../src/api/client';
import { io } from 'socket.io-client';
import { useAuthStore } from '../../src/store/authStore';

export default function PartnerOrdersScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  // Redirect if guest
  useEffect(() => {
    if (!user || user.role !== 'restaurant') {
      router.replace('/restaurant/login');
    }
  }, [user]);

  // Real-time Sockets
  useEffect(() => {
    if (!user?._id) return;
    const backendHost = getBaseURL().replace('/api', '');
    const socket = io(backendHost);
    
    socket.emit('joinRoom', user._id);

    socket.on('orderPlaced', (newOrder) => {
      console.log('🆕 New order received via socket:', newOrder);
      queryClient.invalidateQueries({ queryKey: ['restaurantOrders'] });
      queryClient.invalidateQueries({ queryKey: ['avgPrepTime'] });
    });

    socket.on('orderUpdated', (updatedOrder) => {
      console.log('🔄 Order updated via socket:', updatedOrder);
      queryClient.invalidateQueries({ queryKey: ['restaurantOrders'] });
      queryClient.invalidateQueries({ queryKey: ['avgPrepTime'] });
    });

    return () => {
      socket.emit('leaveRoom', user._id);
      socket.disconnect();
    };
  }, [user?._id]);

  // Fetch restaurant orders
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['restaurantOrders', user?._id],
    queryFn: async () => {
      const res = await client.get('/orders/restaurant');
      return res.data || [];
    },
    enabled: !!user?._id,
  });

  // Status update mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return client.put(`/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantOrders'] });
      queryClient.invalidateQueries({ queryKey: ['avgPrepTime'] });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update order status.');
    },
  });

  const getNextStatus = (current: string) => {
    const map: Record<string, string> = {
      pending: 'Accepted',
      accepted: 'Preparing',
      preparing: 'Delivered',
    };
    return map[current.toLowerCase()] || null;
  };

  const getButtonText = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'pending') return 'Accept Order';
    if (s === 'accepted') return 'Start Preparing';
    if (s === 'preparing') return 'Complete Order';
    return '';
  };

  const handleUpdateStatus = (orderId: string, nextStatus: string) => {
    updateStatusMutation.mutate({ orderId, status: nextStatus });
  };

  // Filter Active vs Past
  const activeList = orders.filter((o: any) =>
    ['pending', 'accepted', 'preparing'].includes(o.status?.toLowerCase())
  );
  const pastList = orders.filter((o: any) =>
    ['delivered', 'cancelled'].includes(o.status?.toLowerCase())
  );
  const displayedOrders = activeTab === 'active' ? activeList : pastList;

  const renderOrderCard = ({ item }: { item: any }) => {
    const orderNum = item.orderNumber || `#${item._id?.slice(-6)}`;
    const dateStr = new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nextStatus = getNextStatus(item.status);
    const btnText = getButtonText(item.status);

    return (
      <View style={styles.orderCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.orderNumber}>Order {orderNum}</Text>
            <Text style={styles.timeText}>🕒 {dateStr}</Text>
          </View>
          <View style={[styles.statusBadge, (styles as any)[`status_${item.status?.toLowerCase()}`] || styles.status_default]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.customerBox}>
          <Text style={styles.customerName}>👤 {item.user?.name || 'Customer'}</Text>
          <Text style={styles.customerEmail}>✉️ {item.user?.email || 'No email'}</Text>
          {item.pickupTime && (
            <Text style={styles.pickupTime}>⏱️ Pickup Target: {item.pickupTime}</Text>
          )}
        </View>

        <View style={styles.itemsList}>
          {item.items?.map((food: any, idx: number) => (
            <View key={idx} style={styles.foodItemRow}>
              <Text style={styles.foodText}>{food.quantity}x {food.name}</Text>
              <Text style={styles.foodPrice}>₹{(food.price * food.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.totalPrice}>Total: ₹{(item.totalPrice || item.total || 0).toFixed(2)}</Text>
          
          {activeTab === 'active' && (
            <View style={styles.actionRow}>
              {nextStatus && (
                <TouchableOpacity 
                  style={styles.actionBtn} 
                  onPress={() => handleUpdateStatus(item._id, nextStatus)}
                  disabled={updateStatusMutation.isPending}
                >
                  <Text style={styles.actionBtnText}>{btnText}</Text>
                </TouchableOpacity>
              )}

              {item.status?.toLowerCase() === 'pending' && (
                <TouchableOpacity 
                  style={styles.declineBtn} 
                  onPress={() => handleUpdateStatus(item._id, 'Cancelled')}
                  disabled={updateStatusMutation.isPending}
                >
                  <Text style={styles.declineBtnText}>Decline</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Manager</Text>
        <Text style={styles.headerSub}>Manage incoming and past outlet orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'active' && styles.tabButtonActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            Active ({activeList.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'past' && styles.tabButtonActive]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            History ({pastList.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#38bdf8" />
        </View>
      ) : (
        <FlatList
          data={displayedOrders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isLoading}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No orders found.</Text>
            </View>
          }
        />
      )}

      {/* Footer Navigation */}
      <View style={styles.footerTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/dashboard')}>
          <Text style={styles.tabIcon}>📊</Text>
          <Text style={styles.footerTabText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/orders')}>
          <Text style={styles.tabIconActive}>📦</Text>
          <Text style={styles.footerTabTextActive}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/menu')}>
          <Text style={styles.tabIcon}>📜</Text>
          <Text style={styles.footerTabText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/profile')}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.footerTabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSub: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#0f172a',
  },
  tabText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#38bdf8',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 90,
  },
  orderCard: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 10,
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  timeText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  status_pending: { backgroundColor: '#FF9800' },
  status_accepted: { backgroundColor: '#2196F3' },
  status_preparing: { backgroundColor: '#9C27B0' },
  status_delivered: { backgroundColor: '#4CAF50' },
  status_cancelled: { backgroundColor: '#E63946' },
  status_default: { backgroundColor: '#9e9e9e' },
  customerBox: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  customerName: {
    fontSize: 13,
    color: '#cbd5e1',
    fontWeight: 'bold',
  },
  customerEmail: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  pickupTime: {
    fontSize: 12,
    color: '#38bdf8',
    fontWeight: 'bold',
    marginTop: 4,
  },
  itemsList: {
    marginBottom: 15,
  },
  foodItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  foodText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  foodPrice: {
    fontSize: 13,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    backgroundColor: '#38bdf8',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionBtnText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 12,
  },
  declineBtn: {
    backgroundColor: '#f87171',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  declineBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 80,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
  },
  footerTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#1e293b',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    flexDirection: 'row',
    paddingBottom: 15,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.4,
  },
  tabIconActive: {
    fontSize: 20,
  },
  footerTabText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 3,
  },
  footerTabTextActive: {
    fontSize: 11,
    color: '#38bdf8',
    fontWeight: 'bold',
    marginTop: 3,
  },
});
