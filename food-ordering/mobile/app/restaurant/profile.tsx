import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch, ActivityIndicator, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client, { getBaseURL } from '../../src/api/client';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../src/store/authStore';

export default function PartnerProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const queryClient = useQueryClient();

  // Form states
  const [restaurantName, setRestaurantName] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [description, setDescription] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Gallery state
  const [gallery, setGallery] = useState<string[]>([]);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // 1) Redirect if guest
  useEffect(() => {
    if (!user || user.role !== 'restaurant') {
      router.replace('/restaurant/login');
    }
  }, [user]);

  // 2) Fetch Restaurant Profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ['restaurantProfile', user?._id],
    queryFn: async () => {
      const res = await client.get('/restaurants/profile');
      return res.data || null;
    },
    enabled: !!user?._id,
  });

  // Populate form when data arrives
  useEffect(() => {
    if (profile) {
      setRestaurantName(profile.restaurantName || '');
      setName(profile.name || '');
      setMobile(profile.mobile || '');
      setAddress(profile.address || '');
      setCuisineType(profile.cuisineType || '');
      setDescription(profile.description || '');
      setOpenTime(profile.openTime || '10:00 AM');
      setCloseTime(profile.closeTime || '10:00 PM');
      setGallery(profile.galleryImages || []);
    }
  }, [profile]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      return client.put('/restaurants/profile', payload);
    },
    onSuccess: () => {
      Alert.alert('Success', 'Business profile updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['restaurantProfile'] });
      setIsEditing(false);
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update profile.');
    },
  });

  const handleSave = () => {
    if (!restaurantName || !name) {
      Alert.alert('Validation Error', 'Outlet name and manager name are required.');
      return;
    }

    const payload = {
      restaurantName,
      name,
      mobile,
      address,
      cuisineType,
      description,
      openTime,
      closeTime,
    };
    updateMutation.mutate(payload);
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to sign out from the Partner Portal?',
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

  const handlePickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: 10,
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        uploadGallery(result.assets);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick images.');
    }
  };

  const uploadGallery = async (assets: ImagePicker.ImagePickerAsset[]) => {
    setUploadingGallery(true);
    try {
      const formData = new FormData() as any;
      assets.forEach((asset, index) => {
        formData.append('images', {
          uri: asset.uri,
          name: `gallery-${Date.now()}-${index}.jpg`,
          type: 'image/jpeg',
        });
      });

      const res = await client.post('/restaurants/upload-gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setGallery(res.data.galleryImages || []);
      Alert.alert('Success', 'Images uploaded successfully.');
      queryClient.invalidateQueries({ queryKey: ['restaurantProfile'] });
    } catch (err: any) {
      Alert.alert('Upload Failed', err.response?.data?.message || 'Failed to upload images.');
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleDeleteImage = (imagePath: string) => {
    const imageName = imagePath.split('/').pop();
    Alert.alert('Delete Image', 'Are you sure you want to remove this image from the gallery?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await client.delete(`/restaurants/gallery/${imageName}`);
            setGallery(res.data.galleryImages || []);
            queryClient.invalidateQueries({ queryKey: ['restaurantProfile'] });
          } catch (err) {
            Alert.alert('Error', 'Failed to delete image.');
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Outlet Settings</Text>
        <Text style={styles.headerSub}>Manage restaurant profile and timings</Text>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#38bdf8" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* Avatar Section */}
          <View style={styles.profileSummary}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{restaurantName?.slice(0, 2).toUpperCase() || '🏪'}</Text>
            </View>
            <Text style={styles.titleText}>{restaurantName || 'Campus Outlet'}</Text>
            <Text style={styles.roleLabel}>MANAGER: {name || 'Not configured'}</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Outlet Business Name *</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                editable={isEditing}
                value={restaurantName}
                onChangeText={setRestaurantName}
                placeholder="e.g. Subway Block C"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Manager Name *</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                editable={isEditing}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Robert Lewis"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contact Phone Number</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                editable={isEditing}
                value={mobile}
                onChangeText={setMobile}
                placeholder="e.g. 9876543210"
                placeholderTextColor="#64748b"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Campus Address / Location</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                editable={isEditing}
                value={address}
                onChangeText={setAddress}
                placeholder="e.g. Food Court Ground floor"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cuisine Type</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                editable={isEditing}
                value={cuisineType}
                onChangeText={setCuisineType}
                placeholder="e.g. Italian, Healthy Salad, Fast Food"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Opening Time</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                editable={isEditing}
                value={openTime}
                onChangeText={setOpenTime}
                placeholder="e.g. 09:00 AM"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Closing Time</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                editable={isEditing}
                value={closeTime}
                onChangeText={setCloseTime}
                placeholder="e.g. 10:00 PM"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Restaurant Description</Text>
              <TextInput
                style={[styles.input, styles.textArea, !isEditing && styles.disabledInput]}
                editable={isEditing}
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
                placeholder="Spicy rolls, beverages, breakfast items..."
                placeholderTextColor="#64748b"
              />
            </View>

            {/* Actions */}
            {isEditing ? (
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.saveBtn, updateMutation.isPending && styles.disabledBtn]} 
                  onPress={handleSave}
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <ActivityIndicator color="#0f172a" />
                  ) : (
                    <Text style={styles.saveBtnText}>Save Settings</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.editToggleBtn} onPress={() => setIsEditing(true)}>
                <Text style={styles.editToggleBtnText}>Edit Business Info</Text>
              </TouchableOpacity>
            )}

            {/* Logout */}
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logoutBtnText}>Log Out Manager</Text>
            </TouchableOpacity>

            {/* Gallery Section */}
            <View style={styles.gallerySection}>
              <Text style={styles.sectionTitle}>Gallery (visible to users)</Text>
              
              <View style={styles.galleryGrid}>
                {gallery.length === 0 ? (
                  <Text style={styles.noCatsText}>No images uploaded yet.</Text>
                ) : (
                  gallery.map((img, idx) => (
                    <View key={idx} style={styles.galleryImageContainer}>
                      <Image 
                        source={{ uri: `${getBaseURL().replace('/api', '')}${img}` }} 
                        style={styles.galleryImage} 
                      />
                      <TouchableOpacity 
                        style={styles.deleteImageBtn}
                        onPress={() => handleDeleteImage(img)}
                      >
                        <Text style={styles.deleteImageBtnText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>

              <TouchableOpacity 
                style={[styles.uploadGalleryBtn, uploadingGallery && styles.disabledBtn]}
                onPress={handlePickImages}
                disabled={uploadingGallery}
              >
                {uploadingGallery ? (
                  <ActivityIndicator color="#0f172a" />
                ) : (
                  <Text style={styles.uploadGalleryBtnText}>+ Add Photos to Gallery</Text>
                )}
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )}

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
          <Text style={styles.tabIcon}>📜</Text>
          <Text style={styles.tabText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurant/profile')}>
          <Text style={styles.tabIconActive}>👤</Text>
          <Text style={styles.tabTextActive}>Profile</Text>
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
  container: {
    padding: 20,
    paddingBottom: 95,
  },
  profileSummary: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#0f172a',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  roleLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 13,
    color: '#cbd5e1',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#fff',
  },
  disabledInput: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    color: '#94a3b8',
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 15,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#cbd5e1',
    fontWeight: 'bold',
    fontSize: 14,
  },
  saveBtn: {
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
  saveBtnText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 14,
  },
  editToggleBtn: {
    backgroundColor: '#334155',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  editToggleBtnText: {
    color: '#38bdf8',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoutBtn: {
    borderWidth: 1.5,
    borderColor: '#f87171',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  logoutBtnText: {
    color: '#f87171',
    fontWeight: 'bold',
    fontSize: 14,
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
  gallerySection: {
    marginTop: 25,
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  galleryImageContainer: {
    width: '31%',
    aspectRatio: 1,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  deleteImageBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteImageBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  uploadGalleryBtn: {
    backgroundColor: '#38bdf8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  uploadGalleryBtnText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noCatsText: {
    color: '#94a3b8',
    fontSize: 13,
  },
});
