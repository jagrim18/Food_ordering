import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../../../mobile/src/api/client';
import { useCartStore } from '../../../mobile/src/store/cartStore';
import { useThemeStore } from '../../../mobile/src/store/themeStore';

export default function MenuScreen() {
  const router = useRouter();
  const { id: restaurantId } = useLocalSearchParams();
  const queryClient = useQueryClient();
  
  const { cart, addToCart, removeFromCart, updateQuantity } = useCartStore();
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
    vegBtnActiveBg: isDark ? '#ffffff' : '#ffffff',
    vegBtnActiveText: isDark ? '#0f172a' : '#111111',
    vegBtnBg: isDark ? '#334155' : '#f1f1f1',
    vegBtnText: isDark ? '#cbd5e1' : '#666666',
    sectionHeaderBg: isDark ? '#1e293b' : '#f5f7fa',
    itemNameText: isDark ? '#ffffff' : '#222222',
    itemDescText: isDark ? '#cbd5e1' : '#777777',
    addBtnBg: isDark ? '#1e293b' : '#ffffff',
  };

  const [search, setSearch] = useState('');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');

  // Fetch menu details via TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['menu', restaurantId],
    queryFn: async () => {
      const res = await client.get(`/restaurantitems/full/${restaurantId}`);
      if (res.data?.success) {
        return {
          restaurant: res.data.restaurant,
          menu: res.data.menu || [],
        };
      }
      throw new Error('Failed to load menu details.');
    },
    enabled: !!restaurantId,
  });

  const restaurant = data?.restaurant;
  const menuItems = data?.menu || [];

  // Helper to resolve backend image path
  const resolveImg = (img: string) => {
    if (!img) return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=250';
    if (img.startsWith('http')) return img;
    const baseUrl = client.defaults.baseURL?.replace('/api', '') || 'http://localhost:5000';
    const cleanPath = img.replace(/\\/g, '/').replace(/^\/+/, '');
    return `${baseUrl}/${cleanPath}`;
  };

  const handleAddToCart = (item: any) => {
    const res = addToCart(item, restaurantId as string, false);
    if (res.conflict) {
      Alert.alert(
        'Clear Cart?',
        '⚠️ Your cart contains items from another outlet. Would you like to clear it and add this item instead?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Clear & Add', 
            style: 'destructive',
            onPress: () => addToCart(item, restaurantId as string, true)
          }
        ]
      );
    }
  };

  const getQty = (itemId: string) => {
    const found = cart.find((c) => c.item._id === itemId);
    return found ? found.quantity : 0;
  };

  // Filter items
  const filteredItems = menuItems.filter((item: any) => {
    if (vegFilter === 'veg' && !item.isVeg) return false;
    if (vegFilter === 'nonveg' && item.isVeg) return false;
    if (search.trim() && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Group by category for SectionList
  const groupedSections = filteredItems.reduce((acc: any[], item: any) => {
    const categoryName = item.category || 'General';
    const existingSection = acc.find((s) => s.title === categoryName);
    if (existingSection) {
      existingSection.data.push(item);
    } else {
      acc.push({ title: categoryName, data: [item] });
    }
    return acc;
  }, []);

  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);

  const renderItem = ({ item }: { item: any }) => {
    const qty = getQty(item._id);
    return (
      <View style={[styles.menuCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: isDark ? 1 : 0 }]}>
        <View style={styles.menuImgWrapper}>
          <Image source={{ uri: resolveImg(item.image) }} style={styles.menuImg} />
          <View style={[styles.vegIndicator, { backgroundColor: item.isVeg ? '#4CAF50' : '#E63946' }]} />
        </View>

        <View style={styles.menuContent}>
          <View style={styles.menuNamePrice}>
            <Text style={[styles.itemName, { color: colors.itemNameText }]}>{item.name}</Text>
            <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
          </View>
          <Text style={[styles.itemDesc, { color: colors.itemDescText }]} numberOfLines={2}>
            {item.description || 'Tasty campus specialty cooked fresh.'}
          </Text>

          <View style={styles.actionRow}>
            {qty > 0 ? (
              <View style={styles.qtyController}>
                <TouchableOpacity onPress={() => removeFromCart(item._id)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{qty}</Text>
                <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.addBtnBg }]} onPress={() => handleAddToCart(item)}>
                <Text style={styles.addBtnText}>+ ADD</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.restaurantName, { color: colors.text }]} numberOfLines={1}>
          {restaurant?.restaurantName || restaurant?.name || 'Menu'}
        </Text>
      </View>

      <View style={[styles.filtersContainer, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder, borderWidth: isDark ? 1 : 0, borderColor: colors.headerBorder }]}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.inputBg, color: colors.inputText }]}
          placeholder="Search items in menu..."
          placeholderTextColor={isDark ? '#cbd5e1' : '#999'}
          value={search}
          onChangeText={setSearch}
        />
        <View style={[styles.vegToggle, { backgroundColor: colors.vegBtnBg }]}>
          <TouchableOpacity 
            style={[styles.vegBtn, vegFilter === 'all' && { backgroundColor: colors.vegBtnActiveBg }]}
            onPress={() => setVegFilter('all')}
          >
            <Text style={[styles.vegBtnText, { color: vegFilter === 'all' ? colors.vegBtnActiveText : colors.vegBtnText }]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.vegBtn, vegFilter === 'veg' && { backgroundColor: colors.vegBtnActiveBg }]}
            onPress={() => setVegFilter('veg')}
          >
            <Text style={[styles.vegBtnText, { color: vegFilter === 'veg' ? colors.vegBtnActiveText : colors.vegBtnText }]}>🟢 Veg</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.vegBtn, vegFilter === 'nonveg' && { backgroundColor: colors.vegBtnActiveBg }]}
            onPress={() => setVegFilter('nonveg')}
          >
            <Text style={[styles.vegBtnText, { color: vegFilter === 'nonveg' ? colors.vegBtnActiveText : colors.vegBtnText }]}>🔴 Non-Veg</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#E63946" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: '#E63946' }]}>Failed to load menu items.</Text>
        </View>
      ) : (
        <SectionList
          sections={groupedSections}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={[styles.sectionHeader, { backgroundColor: 'transparent' }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={[styles.emptyText, { color: colors.subtext }]}>No menu items found.</Text>
            </View>
          }
        />
      )}

      {totalItemsInCart > 0 && (
        <View style={styles.cartSummary}>
          <Text style={styles.cartSummaryText}>🛍️ {totalItemsInCart} items | ₹{cartSubtotal.toFixed(2)}</Text>
          <TouchableOpacity style={styles.viewCartBtn} onPress={() => router.push('/cart')}>
            <Text style={styles.viewCartBtnText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f7fa' },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 45, // notch space
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  backBtnText: {
    fontSize: 16,
    color: '#E63946',
    fontWeight: '600',
  },
  restaurantName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111',
    flex: 1,
  },
  filtersContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
  },
  vegToggle: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 3,
  },
  vegBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 15,
  },
  vegBtnActive: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  vegBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  vegBtnTextActive: {
    color: '#111',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 110, // space for floating bar
  },
  sectionHeader: {
    marginBottom: 10,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  menuImgWrapper: {
    width: 85,
    height: 85,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 15,
  },
  menuImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  vegIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  menuContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  menuNamePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E63946',
  },
  itemDesc: {
    fontSize: 12,
    color: '#777',
    marginVertical: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  addBtn: {
    backgroundColor: '#fff',
    borderColor: '#E63946',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 5,
    alignItems: 'center',
    width: 75,
  },
  addBtnText: {
    color: '#E63946',
    fontWeight: 'bold',
    fontSize: 12,
  },
  qtyController: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 85,
    justifyContent: 'space-between',
    backgroundColor: '#E63946',
    borderRadius: 6,
    overflow: 'hidden',
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  qtyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  errorText: {
    color: '#E63946',
    fontSize: 15,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  cartSummary: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: '#E63946',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#E63946',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  cartSummaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  viewCartBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewCartBtnText: {
    color: '#E63946',
    fontWeight: 'bold',
    fontSize: 13,
  }
});
