import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Modal, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../src/api/client';
import { useAuthStore } from '../src/store/authStore';
import { useThemeStore } from '../src/store/themeStore';

export default function OrdersScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#0f172a' : '#f5f7fa',
    headerBg: isDark ? '#1e293b' : '#ffffff',
    headerBorder: isDark ? '#334155' : '#eeeeee',
    text: isDark ? '#ffffff' : '#111111',
    subtext: isDark ? '#94a3b8' : '#666666',
    cardBg: isDark ? '#1e293b' : '#ffffff',
    cardBorder: isDark ? '#334155' : '#eeeeee',
    inputBg: isDark ? '#1e293b' : '#f1f1f1',
    inputText: isDark ? '#ffffff' : '#333333',
    divider: isDark ? '#334155' : '#f5f5f5',
    tabActiveBg: isDark ? '#334155' : '#f1f1f1',
    tabInactiveBg: 'transparent',
    tabActiveText: '#E63946',
    tabInactiveText: isDark ? '#cbd5e1' : '#666666',
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
    foodLineText: isDark ? '#e2e8f0' : '#444444',
    viewBtnBg: isDark ? '#334155' : '#f1f1f1',
    viewBtnText: isDark ? '#ffffff' : '#333333',
    cancelBtnBg: isDark ? '#7f1d1d' : '#FFF0F0',
    cancelBtnBorder: isDark ? '#000000ff' : '#FFD2D2',
    cancelBtnText: isDark ? '#fca5a5' : '#E63946',
    invoiceHeaderBg: isDark ? '#1e293b' : '#f9f9f9',
    tableBorder: isDark ? '#334155' : '#dddddd',
    paymentMethodBg: isDark ? '#1e293b' : '#fafafa',
  };

  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  // 1) Redirect if guest
  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  // 2) Fetch Orders Query
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['myorders', user?._id],
    queryFn: async () => {
      const res = await client.get('/orders/myorders');
      return res.data || [];
    },
    enabled: !!user?._id,
  });

  // 3) Cancel Mutation
  const cancelMutation = useMutation({
    mutationFn: async (orderId: string) => {
      return client.put(`/orders/${orderId}/cancel`);
    },
    onSuccess: () => {
      Alert.alert('Success', 'Order cancelled successfully.');
      queryClient.invalidateQueries({ queryKey: ['myorders'] });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to cancel order.');
    },
  });

  // 4) Live Countdown timer for Cancellation Window (2 minutes)
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimes: Record<string, number> = {};
      orders.forEach((o: any) => {
        if (o.status === 'Pending') {
          const createdAtTime = new Date(o.createdAt).getTime();
          const diff = 2 * 60 * 1000 - (Date.now() - createdAtTime);
          updatedTimes[o._id] = diff > 0 ? diff : 0;
        }
      });
      setTimeLeft(updatedTimes);
    }, 1000);

    return () => clearInterval(timer);
  }, [orders]);

  const formatTime = (ms: number) => {
    if (!ms || ms <= 0) return '00:00';
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancelOrder = (orderId: string) => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => cancelMutation.mutate(orderId)
        }
      ]
    );
  };

  const handleViewInvoice = async (order: any) => {
    setSelectedOrder(order);
    setShowInvoiceModal(true);
  };

  // Filter Active vs Past
  const activeOrders = orders.filter((o: any) => {
    const status = o.status?.toLowerCase().trim();
    return status !== 'delivered' && status !== 'cancelled';
  });

  const pastOrders = orders.filter((o: any) => {
    const status = o.status?.toLowerCase().trim();
    return status === 'delivered' || status === 'cancelled';
  });

  const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders;

  const renderOrderCard = ({ item }: { item: any }) => {
    const orderNum = item.orderNumber || `#${item._id?.slice(-6)}`;
    const isPending = item.status === 'Pending';
    const msRemaining = timeLeft[item._id] || 0;
    const canCancel = isPending && msRemaining > 0;

    return (
      <View style={[styles.orderCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: isDark ? 1 : 0 }]}>
        <View style={[styles.cardHeader, { borderBottomColor: colors.divider }]}>
          <View>
            <Text style={[styles.orderNumber, { color: colors.text }]}>Order {orderNum}</Text>
            <Text style={[styles.outletName, { color: colors.subtext }]}>📍 {item.restaurant?.restaurantName || item.restaurant?.name || 'Campus Outlet'}</Text>
          </View>
          <View style={[styles.statusBadge, (styles as any)[`status_${item.status?.toLowerCase()}`] || styles.status_default]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.itemsSummary}>
          {item.items?.map((food: any, idx: number) => (
            <Text key={idx} style={[styles.foodItemLine, { color: colors.foodLineText }]}>
              • {food.quantity}x {food.name} (₹{food.price})
            </Text>
          ))}
        </View>

        <View style={[styles.cardFooter, { borderTopColor: colors.divider }]}>
          <Text style={[styles.totalPrice, { color: colors.text }]}>Total: ₹{(item.totalPrice || item.total || 0).toFixed(2)}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.viewBtn, { backgroundColor: colors.viewBtnBg }]} onPress={() => handleViewInvoice(item)}>
              <Text style={[styles.viewBtnText, { color: colors.viewBtnText }]}>Details</Text>
            </TouchableOpacity>

            {canCancel && (
              <TouchableOpacity
                style={[styles.cancelBtn, { backgroundColor: colors.cancelBtnBg, borderColor: colors.cancelBtnBorder }]}
                onPress={() => handleCancelOrder(item._id)}
              >
                <Text style={[styles.cancelBtnText, { color: colors.cancelBtnText }]}>Cancel ({formatTime(msRemaining)})</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Title Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Orders</Text>
        <Text style={[styles.headerSub, { color: colors.subtext }]}>Track and view your food orders</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'active' && { backgroundColor: colors.tabActiveBg }]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'active' ? colors.tabActiveText : colors.tabInactiveText, fontWeight: activeTab === 'active' ? 'bold' : '600' }]}>
            Active ({activeOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'past' && { backgroundColor: colors.tabActiveBg }]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'past' ? colors.tabActiveText : colors.tabInactiveText, fontWeight: activeTab === 'past' ? 'bold' : '600' }]}>
            Past Orders ({pastOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#E63946" />
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
              <Text style={[styles.emptyText, { color: colors.subtext }]}>
                No {activeTab === 'active' ? 'active' : 'past'} orders found.
              </Text>
            </View>
          }
        />
      )}

      {/* Invoice Modal */}
      <Modal visible={showInvoiceModal} animationType="slide" transparent>
        <View style={[styles.modalOverlay, { backgroundColor: colors.modalOverlay }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.headerBg }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.headerBorder }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Order Invoice Details</Text>
              <TouchableOpacity onPress={() => setShowInvoiceModal(false)}>
                <Text style={[styles.closeModalText, { color: colors.subtext }]}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedOrder && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.invoiceHeader, { backgroundColor: colors.invoiceHeaderBg, borderColor: colors.headerBorder }]}>
                  <Text style={[styles.invoiceOrderNum, { color: colors.text }]}>ID: {selectedOrder.orderNumber || selectedOrder._id}</Text>
                  <Text style={[styles.invoiceDate, { color: colors.subtext }]}>Date: {new Date(selectedOrder.createdAt).toLocaleString()}</Text>
                  <Text style={[styles.invoiceOutlet, { color: colors.subtext }]}>Outlet: {selectedOrder.restaurant?.restaurantName || selectedOrder.restaurant?.name}</Text>
                </View>

                {/* Table Header */}
                <View style={[styles.tableRowHeader, { borderBottomColor: colors.tableBorder }]}>
                  <Text style={[styles.tableCol, styles.colName, { color: colors.text, fontWeight: 'bold' }]}>Item</Text>
                  <Text style={[styles.tableCol, styles.colQty, { color: colors.text, fontWeight: 'bold' }]}>Qty</Text>
                  <Text style={[styles.tableCol, styles.colPrice, { color: colors.text, fontWeight: 'bold' }]}>Price</Text>
                  <Text style={[styles.tableCol, styles.colTotal, { color: colors.text, fontWeight: 'bold' }]}>Total</Text>
                </View>

                {/* Items List */}
                {selectedOrder.items?.map((item: any, idx: number) => (
                  <View key={idx} style={[styles.tableRow, { borderBottomColor: colors.divider }]}>
                    <Text style={[styles.tableCol, styles.colName, { color: colors.foodLineText }]}>{item.name}</Text>
                    <Text style={[styles.tableCol, styles.colQty, { color: colors.foodLineText }]}>{item.quantity}</Text>
                    <Text style={[styles.tableCol, styles.colPrice, { color: colors.foodLineText }]}>₹{item.price}</Text>
                    <Text style={[styles.tableCol, styles.colTotal, { color: colors.foodLineText }]}>₹{(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                ))}

                <View style={[styles.invoiceTotalRow, { borderTopColor: colors.tableBorder }]}>
                  <Text style={[styles.invoiceTotalLabel, { color: colors.text }]}>Grand Total:</Text>
                  <Text style={styles.invoiceTotalVal}>₹{(selectedOrder.totalPrice || selectedOrder.total || 0).toFixed(2)}</Text>
                </View>

                <View style={[styles.paymentMethod, { backgroundColor: colors.paymentMethodBg, borderColor: colors.headerBorder }]}>
                  <Text style={[styles.paymentMethodText, { color: colors.text }]}>💳 Payment: Collected cash at counter</Text>
                  <Text style={[styles.pickupTimeNote, { color: colors.subtext }]}>Estimated Pickup Time: {selectedOrder.pickupTime || '15 minutes'}</Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Footer Navigation */}
      <View style={[styles.footerTab, { backgroundColor: colors.headerBg, borderTopColor: colors.headerBorder }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurants')}>
          <Text style={[styles.tabIcon, isDark && { opacity: 0.8 }]}>🍔</Text>
          <Text style={[styles.footerTabText, { color: colors.tabInactiveText }]}>Outlets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/orders')}>
          <Text style={styles.tabIconActive}>📦</Text>
          <Text style={[styles.footerTabTextActive, { color: colors.tabActiveText }]}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
          <Text style={[styles.tabIcon, isDark && { opacity: 0.8 }]}>👤</Text>
          <Text style={[styles.footerTabText, { color: colors.tabInactiveText }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  headerSub: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#f1f1f1',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#E63946',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 90,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    paddingBottom: 10,
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  outletName: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  status_pending: { backgroundColor: '#FF9800' },
  status_preparing: { backgroundColor: '#2196F3' },
  status_ready: { backgroundColor: '#4CAF50' },
  status_delivered: { backgroundColor: '#4CAF50' },
  status_cancelled: { backgroundColor: '#E63946' },
  status_default: { backgroundColor: '#9e9e9e' },
  itemsSummary: {
    marginBottom: 12,
  },
  foodItemLine: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  viewBtn: {
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewBtnText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cancelBtn: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FFD2D2',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancelBtnText: {
    color: '#E63946',
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
    color: '#999',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
  },
  closeModalText: {
    fontSize: 20,
    color: '#777',
    padding: 5,
  },
  invoiceHeader: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  invoiceOrderNum: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111',
  },
  invoiceDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  invoiceOutlet: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  tableRowHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: '#ddd',
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
  },
  tableCol: {
    fontSize: 13,
    color: '#333',
  },
  colName: { flex: 2 },
  colQty: { flex: 0.5, textAlign: 'center' },
  colPrice: { flex: 1, textAlign: 'right' },
  colTotal: { flex: 1, textAlign: 'right' },
  bold: { fontWeight: 'bold', color: '#111' },
  invoiceTotalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1.5,
    borderTopColor: '#ddd',
    paddingTop: 10,
    marginTop: 15,
  },
  invoiceTotalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111',
    marginRight: 10,
  },
  invoiceTotalVal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#E63946',
  },
  paymentMethod: {
    marginTop: 20,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
  },
  paymentMethodText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  pickupTimeNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  footerTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
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
    color: '#999',
    fontWeight: '600',
    marginTop: 3,
  },
  footerTabTextActive: {
    fontSize: 11,
    color: '#E63946',
    fontWeight: 'bold',
    marginTop: 3,
  },
});
