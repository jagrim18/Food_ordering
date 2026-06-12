import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import client from '../../src/api/client';
import { useCartStore } from '../../src/store/cartStore';
import { useAuthStore } from '../../src/store/authStore';
import { useThemeStore } from '../../src/store/themeStore';

const { width } = Dimensions.get('window');

export default function RestaurantListScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { cart } = useCartStore();
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
    badgeBg: isDark ? '#334155' : '#f1f1f1',
    badgeText: isDark ? '#cbd5e1' : '#666666',
    badgeActiveBg: isDark ? '#ffffff' : '#111111',
    badgeActiveText: isDark ? '#0f172a' : '#ffffff',
    tabActiveText: '#E63946',
    tabInactiveText: isDark ? '#94a3b8' : '#999999',
    divider: isDark ? '#334155' : '#f5f5f5',
    timingColor: isDark ? '#cbd5e1' : '#555555',
  };

  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState<'rating' | 'price' | 'popularity' | ''>('');

  // Cart total count helper
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // TanStack Query to fetch restaurants
  const { data: restaurants = [], isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const res = await client.get('/restaurants');
      const data = res.data || [];
      // Filter out explicitly closed restaurants (matching web logic)
      return data.filter((r: any) => r.isOpen !== false);
    },
  });

  // Local redirect if user is not authenticated
  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  // Handle Search & Filter & Sort
  const getProcessedRestaurants = () => {
    let list = [...restaurants];

    // 1) Search
    if (search.trim()) {
      list = list.filter((r) => {
        const name = r.restaurantName || r.name || '';
        const description = r.description || '';
        return (
          name.toLowerCase().includes(search.toLowerCase()) ||
          description.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    // 2) Sort
    if (sortOption === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortOption === 'price') {
      list.sort((a, b) => (a.avgPrice || 0) - (b.avgPrice || 0));
    } else if (sortOption === 'popularity') {
      list.sort((a, b) => (b.orders || 0) - (a.orders || 0));
    }

    return list;
  };

  const processedList = getProcessedRestaurants();

  // Helper to resolve backend image paths
  const resolveImg = (img: string) => {
    if (!img) return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80';
    if (img.startsWith('http')) return img;
    // Resolve absolute path from backend base URL
    const baseUrl = client.defaults.baseURL?.replace('/api', '') || 'http://localhost:5000';
    const cleanPath = img.replace(/\\/g, '/').replace(/^\/+/, '');
    return `${baseUrl}/${cleanPath}`;
  };

  const renderRestaurant = ({ item }: { item: any }) => {
    // Web uses gallery images auto carousel, we'll pick the primary image or first item
    const displayImage = item.galleryImages && item.galleryImages.length > 0
      ? resolveImg(item.galleryImages[0])
      : resolveImg(item.image);

    return (
      <TouchableOpacity 
        style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: isDark ? 1 : 0 }]} 
        onPress={() => router.push(`/restaurants/${item._id}`)}
        activeOpacity={0.85}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: displayImage }} style={styles.image} />
          <View style={[styles.statusBadge, { backgroundColor: item.isOpen ? '#4CAF50' : '#E63946' }]}>
            <Text style={styles.statusText}>{item.isOpen ? 'Open' : 'Closed'}</Text>
          </View>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.restaurantName || item.name}</Text>
            {!!item.rating && (
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {item.rating.toFixed(1)}</Text>
              </View>
            )}
          </View>
          
          <Text style={[styles.cardDesc, { color: colors.subtext }]} numberOfLines={1}>
            {item.description || 'Delicious hot meals available'}
          </Text>
          
          <View style={[styles.cardFooter, { borderTopColor: colors.divider }]}>
            <Text style={[styles.timing, { color: colors.timingColor }]}>⏰ {item.openTime || '11:00 AM'} - {item.closeTime || '9:00 PM'}</Text>
            {!!item.avgPrice && (
              <Text style={[styles.priceLabel, { color: colors.text }]}>Avg: ₹{item.avgPrice}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* HEADER SECTION */}
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>Hello, {user?.name || 'Guest'} 👋</Text>
          <Text style={[styles.pageSubtitle, { color: colors.subtext }]}>Campus Food Outlets</Text>
        </View>
        
        {/* Floating Cart Button */}
        <TouchableOpacity style={[styles.cartButton, { backgroundColor: colors.inputBg, borderColor: colors.headerBorder }]} onPress={() => router.push('/cart')}>
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* FILTER & SEARCH ROW */}
      <View style={[styles.filterContainer, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.inputBg, color: colors.inputText }]}
          placeholder="Search food outlets..."
          placeholderTextColor={isDark ? '#cbd5e1' : '#999'}
          value={search}
          onChangeText={setSearch}
        />
        
        {/* Quick Sorting Badges */}
        <View style={styles.sortRow}>
          <TouchableOpacity 
            style={[styles.sortBadge, { backgroundColor: sortOption === '' ? colors.badgeActiveBg : colors.badgeBg }]} 
            onPress={() => setSortOption('')}
          >
            <Text style={[styles.sortBadgeText, { color: sortOption === '' ? colors.badgeActiveText : colors.badgeText }]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortBadge, { backgroundColor: sortOption === 'rating' ? colors.badgeActiveBg : colors.badgeBg }]} 
            onPress={() => setSortOption('rating')}
          >
            <Text style={[styles.sortBadgeText, { color: sortOption === 'rating' ? colors.badgeActiveText : colors.badgeText }]}>⭐ Top Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortBadge, { backgroundColor: sortOption === 'price' ? colors.badgeActiveBg : colors.badgeBg }]} 
            onPress={() => setSortOption('price')}
          >
            <Text style={[styles.sortBadgeText, { color: sortOption === 'price' ? colors.badgeActiveText : colors.badgeText }]}>₹ Price (Low)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortBadge, { backgroundColor: sortOption === 'popularity' ? colors.badgeActiveBg : colors.badgeBg }]} 
            onPress={() => setSortOption('popularity')}
          >
            <Text style={[styles.sortBadgeText, { color: sortOption === 'popularity' ? colors.badgeActiveText : colors.badgeText }]}>🔥 Popular</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* RENDER BODY */}
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#E63946" />
          <Text style={[styles.loadingText, { color: colors.subtext }]}>Loading campus outlets...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorLabel}>❌ Failed to load food outlets.</Text>
          <Text style={[styles.errorSub, { color: colors.subtext }]}>Check your server connection.</Text>
        </View>
      ) : (
        <FlatList
          data={processedList}
          keyExtractor={(item) => item._id}
          renderItem={renderRestaurant}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={[styles.emptyText, { color: colors.subtext }]}>No outlets found matching your criteria.</Text>
            </View>
          }
        />
      )}

      {/* BOTTOM NAVIGATION FOOTER */}
      <View style={[styles.footerTab, { backgroundColor: colors.headerBg, borderTopColor: colors.headerBorder }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurants')}>
          <Text style={styles.tabIconActive}>🍔</Text>
          <Text style={[styles.tabTextActive, { color: colors.tabActiveText }]}>Outlets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/orders')}>
          <Text style={[styles.tabIcon, isDark && { opacity: 0.8 }]}>📦</Text>
          <Text style={[styles.tabText, { color: colors.tabInactiveText }]}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
          <Text style={[styles.tabIcon, isDark && { opacity: 0.8 }]}>👤</Text>
          <Text style={[styles.tabText, { color: colors.tabInactiveText }]}>Profile</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  cartButton: {
    backgroundColor: '#f9f9f9',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    position: 'relative',
  },
  cartIcon: {
    fontSize: 20,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E63946',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  filterContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#333',
    marginBottom: 12,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  sortBadge: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  sortBadgeActive: {
    backgroundColor: '#111',
  },
  sortBadgeText: {
    fontSize: 11,
    color: '#666',
    fontWeight: 'bold',
  },
  sortBadgeTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 90, // Space for footer
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  cardInfo: {
    padding: 15,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
    flex: 1,
    marginRight: 10,
  },
  ratingBadge: {
    backgroundColor: '#FFF9E6',
    borderColor: '#FFE0B2',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: '#E65100',
    fontWeight: 'bold',
    fontSize: 11,
  },
  cardDesc: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    paddingTop: 10,
  },
  timing: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 60,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 15,
  },
  errorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
  },
  errorSub: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
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
  tabText: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginTop: 3,
  },
  tabTextActive: {
    fontSize: 11,
    color: '#E63946',
    fontWeight: 'bold',
    marginTop: 3,
  },
});
