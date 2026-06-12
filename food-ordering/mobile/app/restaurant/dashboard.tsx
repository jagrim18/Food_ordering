import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import client, { getBaseURL } from '../../src/api/client';
import { io } from 'socket.io-client';
import { useAuthStore } from '../../src/store/authStore';

export default function PartnerDashboardScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // 1) Redirect if unauthorized
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

    socket.on('orderPlaced', () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantOrders'] });
      queryClient.invalidateQueries({ queryKey: ['avgPrepTime'] });
    });

    socket.on('orderUpdated', () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantOrders'] });
      queryClient.invalidateQueries({ queryKey: ['avgPrepTime'] });
    });

    return () => {
      socket.emit('leaveRoom', user._id);
      socket.disconnect();
    };
  }, [user?._id]);

  // 2) Fetch Restaurant Profile (for open/closed status & info)
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['restaurantProfile', user?._id],
    queryFn: async () => {
      const res = await client.get('/restaurants/profile');
      return res.data || null;
    },
    enabled: !!user?._id,
  });

  // 3) Fetch Restaurant Orders (for stats calculations)
  const { data: orders = [], isLoading: isOrdersLoading } = useQuery({
    queryKey: ['restaurantOrders', user?._id],
    queryFn: async () => {
      const res = await client.get('/orders/restaurant');
      return res.data || [];
    },
    enabled: !!user?._id,
  });

  // 4) Fetch average prep time
  const { data: avgPrep = 0 } = useQuery({
    queryKey: ['avgPrepTime', user?._id],
    queryFn: async () => {
      const res = await client.get(`/orders/avg-prep-time/${user?._id}`);
      return res.data?.avgPrepTime ?? 0;
    },
    enabled: !!user?._id,
  });

  // Toggle open/closed status
  const handleToggleStatus = async () => {
    try {
      const newStatus = !profile?.isOpen;
      await client.put('/restaurants/profile', { isOpen: newStatus });
      queryClient.invalidateQueries({ queryKey: ['restaurantProfile'] });
      Alert.alert('Status Updated', `Your outlet is now ${newStatus ? 'OPEN' : 'CLOSED'}.`);
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update status.');
    }
  };

  // Stats
  const totalRevenue = orders
    .filter((o: any) => o.status?.toLowerCase() === 'delivered')
    .reduce((sum: number, o: any) => sum + (o.total || o.totalPrice || 0), 0);
  const pendingOrders = orders.filter((o: any) => o.status?.toLowerCase() === 'pending').length;
  const activeOrders = orders.filter((o: any) => ['pending', 'accepted', 'preparing'].includes(o.status?.toLowerCase())).length;

  const handleExport = async (range: string) => {
    try {
      const start = new Date();
      if (range === 'week') start.setDate(start.getDate() - 7);
      if (range === 'month') start.setDate(start.getDate() - 30);
      
      const startStr = start.toISOString().slice(0, 10);
      const endStr = new Date().toISOString().slice(0, 10);

      const params = `?start=${startStr}&end=${endStr}`;
      const res = await client.get(`/restaurants/export-excel${params}`);
      
      if (res.data?.filePath || res.data?.url) {
        const path = res.data.filePath || res.data.url;
        let base = client.defaults.baseURL?.replace('/api', '') || 'http://localhost:5000';
        const downloadUrl = path.startsWith('http') ? path : `${base}${path}`;
        
        Alert.alert(
          'Report Generated',
          'Would you like to open the excel report in your browser?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open', onPress: () => Linking.openURL(downloadUrl) }
          ]
        );
      } else {
        Alert.alert('Export Complete', 'Excel report prepared but couldn’t locate download path.');
      }
    } catch (err: any) {
      Alert.alert('Export Failed', err.message || 'Error exporting Excel report.');
    }
  };

  const isLoading = isProfileLoading || isOrdersLoading;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{profile?.restaurantName || 'Partner Portal'}</Text>
          <Text style={styles.headerSub}>Manage your restaurant and analytics</Text>
        </View>

        {profile && (
          <TouchableOpacity 
            style={[styles.statusToggleBtn, { backgroundColor: profile.isOpen ? '#E8F5E9' : '#FFEBEE', borderColor: profile.isOpen ? '#81C784' : '#E57373' }]}
            onPress={handleToggleStatus}
          >
            <Text style={[styles.statusToggleText, { color: profile.isOpen ? '#2E7D32' : '#C62828' }]}>
              {profile.isOpen ? '🟢 OPEN' : '🔴 CLOSED'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#38bdf8" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Outlet Summary Header */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryHeading}>Welcome Back, {user?.name}</Text>
            <Text style={styles.summaryDesc}>
              Location: {profile?.address || 'Not specified'}{'\n'}
              Cuisine: {profile?.cuisineType || 'General Food'}
            </Text>
          </View>

          {/* Stats Grid */}
          <Text style={styles.sectionTitle}>Overview Analytics</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { borderLeftColor: '#4CAF50' }]}>
              <Text style={styles.statLabel}>Delivered Revenue</Text>
              <Text style={styles.statVal}>₹{totalRevenue.toFixed(2)}</Text>
              <Text style={styles.statSub}>Total income generated</Text>
            </View>

            <View style={[styles.statCard, { borderLeftColor: '#2196F3' }]}>
              <Text style={styles.statLabel}>Active Orders</Text>
              <Text style={styles.statVal}>{activeOrders}</Text>
              <Text style={styles.statSub}>Accept, prepare, or ready</Text>
            </View>

            <View style={[styles.statCard, { borderLeftColor: '#FF9800' }]}>
              <Text style={styles.statLabel}>New Pending</Text>
              <Text style={styles.statVal}>{pendingOrders}</Text>
              <Text style={styles.statSub}>Awaiting confirmation</Text>
            </View>

            <View style={[styles.statCard, { borderLeftColor: '#9C27B0' }]}>
              <Text style={styles.statLabel}>Avg Prep Time</Text>
              <Text style={styles.statVal}>{avgPrep} min</Text>
              <Text style={styles.statSub}>Based on historical orders</Text>
            </View>
          </View>

          {/* Quick Reports Exporter */}
          <Text style={styles.sectionTitle}>Business Reports</Text>
          <View style={styles.exportBox}>
            <Text style={styles.exportText}>Generate sales reports directly into Microsoft Excel spreadsheets.</Text>
            <View style={styles.exportBtnRow}>
              <TouchableOpacity style={styles.exportBtn} onPress={() => handleExport('today')}>
                <Text style={styles.exportBtnText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exportBtn} onPress={() => handleExport('week')}>
                <Text style={styles.exportBtnText}>Last 7 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exportBtn} onPress={() => handleExport('month')}>
                <Text style={styles.exportBtnText}>Last 30 Days</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Footer Navigation */}
      <View style={styles.footerTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/dashboard')}>
          <Text style={styles.tabIconActive}>📊</Text>
          <Text style={styles.tabTextActive}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/orders')}>
          <Text style={styles.tabIcon}>📦</Text>
          <Text style={styles.tabText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/menu')}>
          <Text style={styles.tabIcon}>📜</Text>
          <Text style={styles.tabText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/profile')}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabText}>Profile</Text>
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
    color: '#94a3b8',
    marginTop: 2,
  },
  statusToggleBtn: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  statusToggleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    paddingBottom: 95,
  },
  summaryBox: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  summaryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  summaryDesc: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 25,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#334155',
    borderLeftWidth: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  statVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
  },
  statSub: {
    fontSize: 10,
    color: '#64748b',
  },
  exportBox: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  exportText: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 15,
  },
  exportBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  exportBtn: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  exportBtnText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  tabText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 3,
  },
  tabTextActive: {
    fontSize: 11,
    color: '#38bdf8',
    fontWeight: 'bold',
    marginTop: 3,
  },
});
