import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, TextInput, Modal, Switch, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../src/api/client';
import { useAuthStore } from '../../src/store/authStore';

export default function PartnerMenuScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // Modal forms
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [image, setImage] = useState('');

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // 1) Redirect if unauthorized
  useEffect(() => {
    if (!user || user.role !== 'restaurant') {
      router.replace('/restaurant/login');
    }
  }, [user]);

  // 2) Fetch menu items
  const { data, isLoading } = useQuery({
    queryKey: ['restaurantMenu', user?._id],
    queryFn: async () => {
      const res = await client.get(`/restaurantitems/full/${user?._id}`);
      if (res.data?.success) {
        return {
          categories: res.data.restaurant?.categories || [],
          menu: res.data.menu || [],
        };
      }
      throw new Error('Failed to load menu details.');
    },
    enabled: !!user?._id,
  });

  const categories = data?.categories || [];
  const menuItems = data?.menu || [];

  // Mutations
  const addCategoryMutation = useMutation({
    mutationFn: async (catName: string) => {
      return client.post('/categories', { restaurantId: user?._id, name: catName });
    },
    onSuccess: () => {
      Alert.alert('Success', 'Category added successfully.');
      queryClient.invalidateQueries({ queryKey: ['restaurantMenu'] });
      setShowCategoryModal(false);
      setNewCategoryName('');
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to add category.');
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return client.delete(`/restaurantitems/${itemId}`);
    },
    onSuccess: () => {
      Alert.alert('Success', 'Menu item removed successfully.');
      queryClient.invalidateQueries({ queryKey: ['restaurantMenu'] });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to remove item.');
    },
  });

  const saveItemMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (editingItem) {
        return client.put(`/restaurantitems/${editingItem._id}`, payload);
      }
      return client.post('/restaurantitems', payload);
    },
    onSuccess: () => {
      Alert.alert('Success', `Menu item ${editingItem ? 'updated' : 'added'} successfully.`);
      queryClient.invalidateQueries({ queryKey: ['restaurantMenu'] });
      closeItemModal();
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to save item.');
    },
  });

  const toggleAvailabilityMutation = useMutation({
    mutationFn: async (item: any) => {
      return client.put(`/restaurantitems/${item._id}`, { available: !item.available });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantMenu'] });
    },
    onError: () => {
      Alert.alert('Error', 'Failed to toggle availability.');
    }
  });

  const handleDeleteItem = (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteItemMutation.mutate(itemId) }
      ]
    );
  };

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setPrice('');
    setCategory(categories[0] || '');
    setDescription('');
    setIsVeg(true);
    setIsAvailable(true);
    setImage('');
    setShowItemModal(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setName(item.name);
    setPrice(String(item.price));
    setCategory(item.category);
    setDescription(item.description || '');
    setIsVeg(item.isVeg !== false);
    setIsAvailable(item.available !== false);
    setImage(item.image || '');
    setShowItemModal(true);
  };

  const closeItemModal = () => {
    setShowItemModal(false);
    setEditingItem(null);
  };

  const handleSaveItem = () => {
    if (!name || !price || !category) {
      Alert.alert('Validation Error', 'Please specify item name, price, and category.');
      return;
    }
    
    // We send payload as JSON (multipart is not strictly required if we just send image path/url)
    const payload = {
      restaurantId: user?._id,
      name,
      price: parseFloat(price),
      category,
      description,
      isVeg,
      available: isAvailable,
      image: image || undefined,
    };
    saveItemMutation.mutate(payload);
  };

  // Group items by category for SectionList
  const filteredMenuItems = menuItems.filter((item: any) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  });

  const groupedSections = filteredMenuItems.reduce((acc: any[], item: any) => {
    const catName = item.category || 'General';
    const section = acc.find((s) => s.title === catName);
    if (section) {
      section.data = [...section.data, item];
    } else {
      acc.push({ title: catName, data: [item] });
    }
    return acc;
  }, []);

  const renderMenuItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.menuCard}>
        <View style={styles.cardLeft}>
          <View style={[styles.vegIndicator, { backgroundColor: item.isVeg ? '#4CAF50' : '#E63946' }]} />
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDesc} numberOfLines={2}>
              {item.description || 'Tasty campus special.'}
            </Text>
            <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.cardRight}>
          <TouchableOpacity style={styles.editBtn} onPress={() => toggleAvailabilityMutation.mutate(item)} disabled={toggleAvailabilityMutation.isPending}>
            <Text style={[styles.editBtnText, { color: item.available !== false ? '#34d399' : '#f87171' }]}>
              {item.available !== false ? '👁️ On' : '🚫 Off'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn} onPress={() => openEditModal(item)}>
            <Text style={styles.editBtnText}>✏️ Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDeleteItem(item._id)}>
            <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Menu Management</Text>
          <Text style={styles.headerSub}>Manage your categories and food items</Text>
        </View>

        <View style={styles.actionHeaderRow}>
          <TouchableOpacity style={styles.addCategoryBtn} onPress={() => setShowCategoryModal(true)}>
            <Text style={styles.addCategoryBtnText}>+ Cat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addItemBtn} onPress={openAddModal}>
            <Text style={styles.addItemBtnText}>+ Food</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search items or categories..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#38bdf8" />
        </View>
      ) : (
        <SectionList
          sections={groupedSections}
          keyExtractor={(item) => item._id}
          renderItem={renderMenuItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No menu items found. Add items to get started!</Text>
            </View>
          }
        />
      )}

      {/* Add Category Modal */}
      <Modal visible={showCategoryModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentSmall}>
            <Text style={styles.modalTitle}>Add New Category</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Desserts, Sandwiches"
              placeholderTextColor="#94a3b8"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtnSmall} onPress={() => setShowCategoryModal(false)}>
                <Text style={styles.cancelBtnTextSmall}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.saveBtnSmall, addCategoryMutation.isPending && styles.disabledBtn]} 
                onPress={() => {
                  if (newCategoryName.trim()) addCategoryMutation.mutate(newCategoryName);
                }}
                disabled={addCategoryMutation.isPending}
              >
                <Text style={styles.saveBtnTextSmall}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add / Edit Menu Item Modal */}
      <Modal visible={showItemModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentLarge}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</Text>
              
              <Text style={styles.inputLabel}>Food Item Name *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Paneer Tikka Wrap"
                placeholderTextColor="#94a3b8"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.inputLabel}>Price (INR) *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. 180"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />

              <Text style={styles.inputLabel}>Select Category *</Text>
              <View style={styles.categorySelectRow}>
                {categories.length === 0 ? (
                  <Text style={styles.noCatsText}>Please add a category first.</Text>
                ) : (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 5 }}>
                    {categories.map((catName: string) => (
                      <TouchableOpacity
                        key={catName}
                        style={[styles.catSelectBadge, category === catName && styles.catSelectBadgeActive]}
                        onPress={() => setCategory(catName)}
                      >
                        <Text style={[styles.catSelectText, category === catName && styles.catSelectTextActive]}>
                          {catName}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>

              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.modalInput, styles.textArea]}
                placeholder="Brief details about ingredients, spiciness..."
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />

              <Text style={styles.inputLabel}>Image URL Path</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. /uploads/custom-image.png"
                placeholderTextColor="#94a3b8"
                value={image}
                onChangeText={setImage}
              />

              <View style={styles.switchRow}>
                <Text style={styles.inputLabel}>Is Vegetarian?</Text>
                <Switch
                  value={isVeg}
                  onValueChange={setIsVeg}
                  trackColor={{ false: '#334155', true: '#059669' }}
                  thumbColor={isVeg ? '#34d399' : '#94a3b8'}
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.inputLabel}>Available in Menu?</Text>
                <Switch
                  value={isAvailable}
                  onValueChange={setIsAvailable}
                  trackColor={{ false: '#334155', true: '#0369a1' }}
                  thumbColor={isAvailable ? '#38bdf8' : '#94a3b8'}
                />
              </View>

              <View style={styles.modalActionsLarge}>
                <TouchableOpacity style={styles.cancelBtnLarge} onPress={closeItemModal}>
                  <Text style={styles.cancelBtnTextLarge}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.saveBtnLarge, saveItemMutation.isPending && styles.disabledBtn]} 
                  onPress={handleSaveItem}
                  disabled={saveItemMutation.isPending}
                >
                  {saveItemMutation.isPending ? (
                    <ActivityIndicator color="#0f172a" />
                  ) : (
                    <Text style={styles.saveBtnTextLarge}>Save Food</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Footer Navigation */}
      <View style={styles.footerTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/dashboard')}>
          <Text style={styles.tabIcon}>📊</Text>
          <Text style={styles.tabText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/orders')}>
          <Text style={styles.tabIcon}>📦</Text>
          <Text style={styles.tabText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/menu')}>
          <Text style={styles.tabIconActive}>📜</Text>
          <Text style={styles.tabTextActive}>Menu</Text>
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
  actionHeaderRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addItemBtn: {
    backgroundColor: '#38bdf8',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addItemBtnText: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addCategoryBtn: {
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#475569',
  },
  addCategoryBtnText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 90,
  },
  sectionHeader: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  menuCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  vegIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#38bdf8',
    fontWeight: 'bold',
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  editBtn: {
    backgroundColor: '#334155',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editBtnText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: '#451a1a',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  deleteBtnText: {
    color: '#f87171',
    fontSize: 11,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContentSmall: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalContentLarge: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 13,
    color: '#cbd5e1',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  modalInput: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#fff',
    marginBottom: 15,
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categorySelectRow: {
    marginBottom: 15,
  },
  catSelectBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#334155',
    marginRight: 8,
  },
  catSelectBadgeActive: {
    backgroundColor: '#38bdf8',
  },
  catSelectText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  catSelectTextActive: {
    color: '#0f172a',
  },
  noCatsText: {
    color: '#f87171',
    fontSize: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalActionsLarge: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  cancelBtnSmall: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  cancelBtnTextSmall: {
    color: '#94a3b8',
    fontSize: 14,
  },
  saveBtnSmall: {
    backgroundColor: '#38bdf8',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  saveBtnTextSmall: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelBtnLarge: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelBtnTextLarge: {
    color: '#cbd5e1',
    fontWeight: 'bold',
    fontSize: 14,
  },
  saveBtnLarge: {
    flex: 1,
    backgroundColor: '#38bdf8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  saveBtnTextLarge: {
    color: '#0f172a',
    fontWeight: 'bold',
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
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  searchInput: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#fff',
  },
});
