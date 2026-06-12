import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput, Image, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { useThemeStore } from '../src/store/themeStore';
import * as ImagePicker from 'expo-image-picker';
import client from '../src/api/client';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else {
      setEditName(user.name);
    }
  }, [user]);

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to sign out from your account?',
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

  const handleSelectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Media library access is required to change your profile icon.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setSelectedImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Image Picker Error:', err);
    }
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      Alert.alert('Validation Error', 'Name cannot be empty.');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', editName.trim());

      if (selectedImageUri) {
        const fileUri = selectedImageUri;
        const filename = fileUri.split('/').pop() || 'avatar.png';
        const ext = filename.split('.').pop() || 'png';
        
        formData.append('profileImage', {
          uri: fileUri,
          name: filename,
          type: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
        } as any);
      }

      const res = await client.put('/users/profile', formData);
      const data = res.data;

      // Update auth store
      await updateUser({
        name: data.name,
        profileImage: data.profileImage,
      });

      setIsEditing(false);
      setSelectedImageUri(null);
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || err.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const getAvatarSource = () => {
    if (selectedImageUri) {
      return { uri: selectedImageUri };
    }
    if (user?.profileImage) {
      const baseURL = client.defaults.baseURL?.replace('/api', '') || 'http://localhost:5000';
      return { uri: `${baseURL}${user.profileImage}` };
    }
    return null;
  };

  const avatarSrc = getAvatarSource();

  const colors = {
    background: isDark ? '#0f172a' : '#f5f7fa',
    cardBg: isDark ? '#1e293b' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    subtext: isDark ? '#94a3b8' : '#666666',
    border: isDark ? '#334155' : '#eeeeee',
    headerBg: isDark ? '#1e293b' : '#ffffff',
    headerBorder: isDark ? '#334155' : '#eee',
    inputBg: isDark ? '#0f172a' : '#f9f9f9',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.headerBorder }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Profile</Text>
        <Text style={[styles.headerSub, { color: colors.subtext }]}>Manage your campus food account</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.cardBg }]}>
          <TouchableOpacity 
            style={[styles.avatar, { overflow: 'hidden' }]} 
            onPress={isEditing ? handleSelectImage : undefined}
            activeOpacity={isEditing ? 0.7 : 1}
          >
            {avatarSrc ? (
              <Image source={avatarSrc} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{user?.name?.slice(0, 2).toUpperCase() || 'U'}</Text>
            )}
            {isEditing && (
              <View style={styles.avatarOverlay}>
                <Text style={styles.avatarOverlayText}>Change</Text>
              </View>
            )}
          </TouchableOpacity>

          {isEditing ? (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={[styles.editInput, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
                value={editName}
                onChangeText={setEditName}
                placeholder="Full Name"
                placeholderTextColor="#999"
              />
              <View style={styles.editBtnRow}>
                <TouchableOpacity 
                  style={styles.cancelEditBtn} 
                  onPress={() => { setIsEditing(false); setSelectedImageUri(null); setEditName(user?.name || ''); }}
                >
                  <Text style={styles.cancelEditBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveEditBtn} onPress={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.saveEditBtnText}>Save</Text>}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text style={[styles.userName, { color: colors.text }]}>{user?.name || 'Campus Member'}</Text>
              <Text style={[styles.userEmail, { color: colors.subtext }]}>{user?.email || 'user@university.edu'}</Text>
              <TouchableOpacity style={styles.editBtnSmall} onPress={() => setIsEditing(true)}>
                <Text style={styles.editBtnSmallText}>✏️ Edit Name & Icon</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={[styles.roleBadge, { marginTop: 15 }]}>
            <Text style={styles.roleText}>{user?.role?.toUpperCase() || 'CUSTOMER'}</Text>
          </View>
        </View>

        {/* Options List */}
        <View style={[styles.optionsList, { backgroundColor: colors.cardBg }]}>
          <TouchableOpacity style={[styles.optionItem, { borderBottomColor: colors.border }]} onPress={() => router.push('/orders')}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>📦</Text>
              <Text style={[styles.optionTitle, { color: colors.text }]}>Order History</Text>
            </View>
            <Text style={styles.optionArrow}>➔</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionItem, { borderBottomColor: colors.border }]} onPress={() => router.push('/cart')}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🛒</Text>
              <Text style={[styles.optionTitle, { color: colors.text }]}>My Cart</Text>
            </View>
            <Text style={styles.optionArrow}>➔</Text>
          </TouchableOpacity>

          {/* Dark Mode Switch */}
          <View style={[styles.optionItem, { borderBottomColor: colors.border }]}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🌙</Text>
              <Text style={[styles.optionTitle, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#E63946' }}
              thumbColor={isDark ? '#fff' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={[styles.optionItem, { borderBottomColor: colors.border }]} onPress={() => {
            Alert.alert('Help & Support', 'For help regarding orders, please contact campus support at support@university.edu.');
          }}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>❓</Text>
              <Text style={[styles.optionTitle, { color: colors.text }]}>Help & Support</Text>
            </View>
            <Text style={styles.optionArrow}>➔</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={[styles.footerTab, { backgroundColor: colors.headerBg, borderTopColor: colors.headerBorder }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/restaurants')}>
          <Text style={[styles.tabIcon, { color: colors.text }]}>🍔</Text>
          <Text style={[styles.tabText, { color: colors.subtext }]}>Outlets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/orders')}>
          <Text style={[styles.tabIcon, { color: colors.text }]}>📦</Text>
          <Text style={[styles.tabText, { color: colors.subtext }]}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSub: {
    fontSize: 13,
    marginTop: 2,
  },
  container: {
    padding: 20,
    paddingBottom: 95,
  },
  profileCard: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: '#E63946',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOverlayText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 12,
  },
  editBtnSmall: {
    backgroundColor: '#E63946',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editBtnSmallText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  editInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    marginBottom: 15,
  },
  editBtnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  cancelEditBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelEditBtnText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 13,
  },
  saveEditBtn: {
    flex: 1.5,
    backgroundColor: '#E63946',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveEditBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  roleBadge: {
    backgroundColor: '#111',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  roleText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  optionsList: {
    borderRadius: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 25,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 18,
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  optionArrow: {
    color: '#999',
    fontSize: 14,
  },
  logoutBtn: {
    borderWidth: 1.5,
    borderColor: '#E63946',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#E63946',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopWidth: 1,
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
    color: '#E63946',
  },
  tabText: {
    fontSize: 11,
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
