import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../src/api/client';
import { useAuthStore } from '../../src/store/authStore';

export default function AdminOrdersScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Status Picker Modal states
  const [showPicker, setShowPicker] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  // 1) Redirect if guest
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.replace('/admin/login');
    }
  }, [user]);

  // 2) Fetch All Platform Orders
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['adminAllOrders'],
    queryFn: async () => {
      const res = await client.get('/orders');
      return res.data || [];
    },
    enabled: !!user?._id,
  });

  // 3) Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return client.put(`/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminAllOrders'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      setShowPicker(false);
      Alert.alert('Updated', 'Order status changed successfully.');
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update order status.');
    },
  });

  const handleOpenStatusPicker = (orderId: string, currentStatus: string) => {
    setSelectedOrderId(orderId);
    setSelectedStatus(currentStatus);
    setShowPicker(true);
  };

  const handleSaveStatus = () => {
    if (selectedOrderId) {
      updateStatusMutation.mutate({ orderId: selectedOrderId, status: selectedStatus });
    }
  };

  // Search & Filter
  const getProcessedOrders = () => {
    let list = [...orders];

    // Search
    if (search.trim()) {
      list = list.filter((o) => {
        const orderNum = o.orderNumber || '';
        const clientName = o.user?.name || '';
        const outlet = o.restaurant?.restaurantName || o.restaurant?.name || '';
        return (
          orderNum.toLowerCase().includes(search.toLowerCase()) ||
          clientName.toLowerCase().includes(search.toLowerCase()) ||
          outlet.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    // Status Filter
    if (statusFilter !== 'All') {
      list = list.filter((o) => o.status?.toLowerCase() === statusFilter.toLowerCase());
    }

    // Sort by newest
    list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return list;
  };

  const processedOrders = getProcessedOrders();

  const renderOrderCard = ({ item }: { item: any }) => {
    const orderNum = item.orderNumber || `#${item._id?.slice(-6)}`;
    const dateStr = new Date(item.createdAt).toLocaleString();
    
    return (
      <View style={styles.orderCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.orderNumber}>Order {orderNum}</Text>
            <Text style={styles.dateText}>🕒 {dateStr}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.statusBadge, (styles as any)[`status_${item.status?.toLowerCase()}`] || styles.status_default]}
            onPress={() => handleOpenStatusPicker(item._id, item.status)}
          >
            <Text style={styles.statusText}>{item.status} ⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>🏪 Outlet:</Text>
          <Text style={styles.metaVal}>{item.restaurant?.restaurantName || item.restaurant?.name || 'Outlet'}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>👤 User:</Text>
          <Text style={styles.metaVal}>{item.user?.name || 'Customer'} ({item.user?.email || 'N/A'})</Text>
        </View>

        <View style={styles.itemsBox}>
          {item.items?.map((food: any, idx: number) => (
            <Text key={idx} style={styles.foodText}>
              • {food.quantity}x {food.name} (₹{food.price})
            </Text>
          ))}
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.totalLabel}>Billing Total:</Text>
          <Text style={styles.totalVal}>₹{(item.totalPrice || item.total || 0).toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Tracker</Text>
        <Text style={styles.headerSub}>View and moderate all active transactions</Text>
      </View>

      {/* Filters Container */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by client, outlet, order ID..."
          placeholderTextColor="#64748b"
          value={search}
          onChangeText={setSearch}
        />
        
        {/* Status Segments */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusScroll}>
          {['All', 'Pending', 'Accepted', 'Preparing', 'Delivered', 'Cancelled'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.statusBadgeBtn, statusFilter === status && styles.statusBadgeBtnActive]}
              onPress={() => setStatusFilter(status)}
            >
              <Text style={[styles.statusBadgeBtnText, statusFilter === status && styles.statusBadgeBtnTextActive]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#818cf8" />
        </View>
      ) : (
        <FlatList
          data={processedOrders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isLoading}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No orders recorded matching filters.</Text>
            </View>
          }
        />
      )}

      {/* Status Picker Modal */}
      <Modal visible={showPicker} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Order Status</Text>
            
            <View style={styles.pickerOptions}>
              {['Pending', 'Accepted', 'Preparing', 'Delivered', 'Cancelled'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[styles.pickerItem, selectedStatus === status && styles.pickerItemActive]}
                  onPress={() => setSelectedStatus(status)}
                >
                  <Text style={[styles.pickerItemText, selectedStatus === status && styles.pickerItemTextActive]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowPicker(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalSaveBtn, updateStatusMutation.isPending && styles.disabledBtn]} 
                onPress={handleSaveStatus}
                disabled={updateStatusMutation.isPending}
              >
                <Text style={styles.modalSaveText}>Save Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Footer Navigation */}
      <View style={styles.footerTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/admin/dashboard')}>
          <Text style={styles.tabIcon}>📊</Text>
          <Text style={styles.tabText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/admin/outlets')}>
          <Text style={styles.tabIcon}>🏪</Text>
          <Text style={styles.tabText}>Outlets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/admin/orders')}>
          <Text style={styles.tabIconActive}>📦</Text>
          <Text style={styles.tabTextActive}>Orders</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSub: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  filtersContainer: {
    padding: 15,
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  searchInput: {
    backgroundColor: '#030712',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  statusScroll: {
    flexDirection: 'row',
  },
  statusBadgeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#1f2937',
    marginRight: 8,
  },
  statusBadgeBtnActive: {
    backgroundColor: '#818cf8',
  },
  statusBadgeBtnText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadgeBtnTextActive: {
    color: '#030712',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 90,
  },
  orderCard: {
    backgroundColor: '#111827',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    paddingBottom: 10,
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  dateText: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 3,
  },
  statusBadge: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  status_pending: { backgroundColor: '#FF9800' },
  status_accepted: { backgroundColor: '#2196F3' },
  status_preparing: { backgroundColor: '#9C27B0' },
  status_delivered: { backgroundColor: '#4CAF50' },
  status_cancelled: { backgroundColor: '#E63946' },
  status_default: { backgroundColor: '#9e9e9e' },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  metaLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: 'bold',
    marginRight: 6,
    width: 65,
  },
  metaVal: {
    flex: 1,
    fontSize: 12,
    color: '#cbd5e1',
  },
  itemsBox: {
    backgroundColor: '#030712',
    borderRadius: 8,
    padding: 10,
    marginVertical: 12,
  },
  foodText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '500',
  },
  totalVal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 60,
  },
  emptyText: {
    color: '#4b5563',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerOptions: {
    gap: 8,
    marginBottom: 20,
  },
  pickerItem: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  pickerItemActive: {
    backgroundColor: '#818cf8',
  },
  pickerItemText: {
    color: '#9ca3af',
    fontWeight: '600',
    fontSize: 13,
  },
  pickerItemTextActive: {
    color: '#030712',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#cbd5e1',
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalSaveBtn: {
    flex: 1.5,
    backgroundColor: '#818cf8',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  },
  modalSaveText: {
    color: '#030712',
    fontWeight: 'bold',
    fontSize: 13,
  },
  footerTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
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
  tabText: {
    fontSize: 11,
    color: '#4b5563',
    fontWeight: '600',
    marginTop: 3,
  },
  tabTextActive: {
    fontSize: 11,
    color: '#818cf8',
    fontWeight: 'bold',
    marginTop: 3,
  },
});
