import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Switch, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../src/api/client';
import { useAuthStore } from '../../src/store/authStore';

export default function AdminOutletsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  // 1) Redirect if guest
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.replace('/admin/login');
    }
  }, [user]);

  // 2) Fetch Outlets Performance
  const { data: outlets = [], isLoading, refetch } = useQuery({
    queryKey: ['adminOutlets'],
    queryFn: async () => {
      const res = await client.get('/admin/outlets');
      return res.data?.performance || [];
    },
    enabled: !!user?._id,
  });

  // 3) Update Outlet status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ outletId, isOpen }: { outletId: string; isOpen: boolean }) => {
      return client.put(`/restaurants/${outletId}`, { isOpen });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminOutlets'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update outlet status.');
    },
  });

  const handleToggleStatus = (outletId: string, currentStatus: boolean) => {
    toggleStatusMutation.mutate({ outletId, isOpen: !currentStatus });
  };

  // Filter outlets by search
  const filteredOutlets = outlets.filter((o: any) => {
    const name = o.name || '';
    const desc = o.description || '';
    return name.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase());
  });

  const resolveImg = (img: string) => {
    if (!img) return 'https://placehold.co/150x150?text=Outlet';
    if (img.startsWith('http')) return img;
    const baseUrl = client.defaults.baseURL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/${img.replace(/\\/g, '/').replace(/^\/+/, '')}`;
  };

  const renderOutletCard = ({ item }: { item: any }) => {
    return (
      <View style={styles.outletCard}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: resolveImg(item.image) }} style={styles.outletImg} />
          <View style={styles.headerInfo}>
            <Text style={styles.outletName}>{item.name}</Text>
            <Text style={styles.outletDesc} numberOfLines={1}>{item.description || 'Delicious hot foods.'}</Text>
            <Text style={styles.timingsText}>⏰ {item.openTime || '11:00 AM'} - {item.closeTime || '10:00 PM'}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Orders</Text>
            <Text style={styles.statVal}>{item.orders || 0}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Revenue</Text>
            <Text style={styles.statVal}>₹{(item.revenue || 0).toFixed(2)}</Text>
          </View>
          <View style={[styles.statBox, styles.statusControlBox]}>
            <Text style={[styles.statusTextLabel, { color: item.isOpen ? '#10b981' : '#ef4444' }]}>
              {item.isOpen ? 'OPEN' : 'CLOSED'}
            </Text>
            <Switch
              value={item.isOpen}
              onValueChange={() => handleToggleStatus(item._id, item.isOpen)}
              trackColor={{ false: '#374151', true: '#059669' }}
              thumbColor={item.isOpen ? '#34d399' : '#9ca3af'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Outlet Directory</Text>
        <Text style={styles.headerSub}>Monitor and toggle opening statuses of all outlets</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search outlets..."
          placeholderTextColor="#64748b"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#818cf8" />
        </View>
      ) : (
        <FlatList
          data={filteredOutlets}
          keyExtractor={(item) => item._id}
          renderItem={renderOutletCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isLoading}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No outlets registered on the platform.</Text>
            </View>
          }
        />
      )}

      {/* Footer Navigation */}
      <View style={styles.footerTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/admin/dashboard')}>
          <Text style={styles.tabIcon}>📊</Text>
          <Text style={styles.tabText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/admin/outlets')}>
          <Text style={styles.tabIconActive}>🏪</Text>
          <Text style={styles.tabTextActive}>Outlets</Text>
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
  searchContainer: {
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
  },
  listContainer: {
    padding: 15,
    paddingBottom: 90,
  },
  outletCard: {
    backgroundColor: '#111827',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    paddingBottom: 12,
    marginBottom: 12,
  },
  outletImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  outletName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  outletDesc: {
    fontSize: 12,
    color: '#9ca3af',
    marginVertical: 3,
  },
  timingsText: {
    fontSize: 11,
    color: '#818cf8',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
  },
  statusControlBox: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#4b5563',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statVal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  statusTextLabel: {
    fontSize: 12,
    fontWeight: 'bold',
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
