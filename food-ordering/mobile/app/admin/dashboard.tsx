import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import client from '../../src/api/client';
import { useAuthStore } from '../../src/store/authStore';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  
  const [thisMonth, setThisMonth] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [growth, setGrowth] = useState(0);

  // 1) Redirect if unauthorized
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.replace('/admin/login');
    }
  }, [user]);

  // 2) Fetch platform stats
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await client.get('/admin/dashboard');
      return res.data || {};
    },
    enabled: !!user?._id,
  });

  // 3) Fetch recent orders across all restaurants
  const { data: recentOrdersData, isLoading: isOrdersLoading } = useQuery({
    queryKey: ['adminRecentOrders'],
    queryFn: async () => {
      const res = await client.get('/admin/recent-orders');
      return res.data?.orders || [];
    },
    enabled: !!user?._id,
  });

  // 4) Fetch monthly revenue breakdown
  const { data: monthlyData } = useQuery({
    queryKey: ['adminMonthlyRevenue'],
    queryFn: async () => {
      const res = await client.get('/admin/revenue/monthly');
      const months = res.data?.months || [];
      if (months.length > 0) {
        const last = months[months.length - 1];
        const prev = months[months.length - 2];
        
        const thisVal = last.totalRevenue || 0;
        const lastVal = prev ? prev.totalRevenue : 0;
        setThisMonth(thisVal);
        setLastMonth(lastVal);

        if (prev && prev.totalRevenue) {
          const percent = ((thisVal - lastVal) / lastVal) * 100;
          setGrowth(parseFloat(percent.toFixed(1)));
        } else {
          setGrowth(0);
        }
      }
      return months;
    },
    enabled: !!user?._id,
  });

  const handleDownloadExcel = () => {
    let base = client.defaults.baseURL?.replace('/api', '') || 'http://localhost:5000';
    const finalURL = `${base}/api/admin/revenue/excel`;
    
    Alert.alert(
      'Download Excel Report',
      'Would you like to open the master platform revenue spreadsheet in your browser?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => Linking.openURL(finalURL) }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the Administrator Control Panel?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive', 
          onPress: async () => {
            await logout();
            router.replace('/');
          }
        }
      ]
    );
  };

  const isLoading = isStatsLoading || isOrdersLoading;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Admin Control Panel</Text>
          <Text style={styles.headerSub}>Platform Master Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtnSmall} onPress={handleLogout}>
          <Text style={styles.logoutBtnTextSmall}>Exit</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#818cf8" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { borderLeftColor: '#10b981' }]}>
              <Text style={styles.statLabel}>This Month Sales</Text>
              <Text style={styles.statVal}>₹{thisMonth.toLocaleString()}</Text>
              <Text style={styles.statSub}>{growth >= 0 ? '+' : ''}{growth}% from last month</Text>
            </View>

            <View style={[styles.statCard, { borderLeftColor: '#3b82f6' }]}>
              <Text style={styles.statLabel}>Last Month Sales</Text>
              <Text style={styles.statVal}>₹{lastMonth.toLocaleString()}</Text>
              <Text style={styles.statSub}>Completed comparison</Text>
            </View>

            <View style={[styles.statCard, { borderLeftColor: '#8b5cf6' }]}>
              <Text style={styles.statLabel}>Platform Orders</Text>
              <Text style={styles.statVal}>{stats.totalOrders || 0}</Text>
              <Text style={styles.statSub}>Total orders placed system-wide</Text>
            </View>

            <View style={[styles.statCard, { borderLeftColor: '#f59e0b' }]}>
              <Text style={styles.statLabel}>Registered Users</Text>
              <Text style={styles.statVal}>{stats.totalUsers || 0}</Text>
              <Text style={styles.statSub}>Active students and outlets</Text>
            </View>
          </View>

          {/* Master Excel Report */}
          <View style={styles.reportBox}>
            <Text style={styles.reportTitle}>📥 Platform Financial Export</Text>
            <Text style={styles.reportDesc}>Download a complete master billing and revenue spreadsheet covering all active outlets.</Text>
            <TouchableOpacity style={styles.excelBtn} onPress={handleDownloadExcel}>
              <Text style={styles.excelBtnText}>Download Master Excel</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Platform Orders */}
          <Text style={styles.sectionTitle}>Recent Orders (All Outlets)</Text>
          <View style={styles.ordersCard}>
            {recentOrdersData.length === 0 ? (
              <Text style={styles.emptyText}>No recent orders recorded.</Text>
            ) : (
              recentOrdersData.slice(0, 5).map((order: any, idx: number) => {
                const orderNum = order.orderNumber || `#${order._id?.slice(-6)}`;
                return (
                  <View key={order._id || idx} style={[styles.orderRow, idx === recentOrdersData.length - 1 && styles.lastRow]}>
                    <View style={styles.orderLeft}>
                      <Text style={styles.orderId}>Order {orderNum}</Text>
                      <Text style={styles.orderMeta}>
                        🏪 {order.restaurant?.restaurantName || 'Outlet'}{'\n'}
                        👤 {order.user?.name || 'Customer'}
                      </Text>
                    </View>
                    <View style={styles.orderRight}>
                      <Text style={styles.orderPrice}>₹{order.totalPrice.toFixed(2)}</Text>
                      <View style={[styles.statusBadge, (styles as any)[`status_${order.status?.toLowerCase()}`] || styles.status_default]}>
                        <Text style={styles.statusText}>{order.status}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      )}

      {/* Footer Navigation */}
      <View style={styles.footerTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/admin/dashboard')}>
          <Text style={styles.tabIconActive}>📊</Text>
          <Text style={styles.tabTextActive}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/admin/outlets')}>
          <Text style={styles.tabIcon}>🏪</Text>
          <Text style={styles.tabText}>Outlets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/admin/orders')}>
          <Text style={styles.tabIcon}>📦</Text>
          <Text style={styles.tabText}>Orders</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  logoutBtnSmall: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  logoutBtnTextSmall: {
    color: '#f87171',
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    paddingBottom: 95,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 25,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#1f2937',
    borderLeftWidth: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
  },
  statVal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
  },
  statSub: {
    fontSize: 10,
    color: '#4b5563',
  },
  reportBox: {
    backgroundColor: '#111827',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 25,
  },
  reportTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  reportDesc: {
    fontSize: 12,
    color: '#9ca3af',
    lineHeight: 18,
    marginBottom: 15,
  },
  excelBtn: {
    backgroundColor: '#818cf8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  excelBtnText: {
    color: '#030712',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ordersCard: {
    backgroundColor: '#111827',
    borderRadius: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  orderLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  orderMeta: {
    fontSize: 12,
    color: '#9ca3af',
    lineHeight: 16,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  statusBadge: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  status_pending: { backgroundColor: '#FF9800' },
  status_accepted: { backgroundColor: '#2196F3' },
  status_preparing: { backgroundColor: '#9C27B0' },
  status_delivered: { backgroundColor: '#4CAF50' },
  status_cancelled: { backgroundColor: '#E63946' },
  status_default: { backgroundColor: '#9e9e9e' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#4b5563',
    fontSize: 13,
    paddingVertical: 20,
    textAlign: 'center',
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
