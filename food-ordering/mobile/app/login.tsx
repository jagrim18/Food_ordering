import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { useThemeStore } from '../src/store/themeStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'restaurant' | 'admin'>('user');
  const [error, setError] = useState('');

  const getThemeColors = () => {
    if (role === 'admin') {
      // Fixed Navy Theme
      return {
        background: '#ffffffff',
        card: '#111827',
        text: '#ffffff',
        subtext: '#9ca3af',
        inputBg: '#1f2937',
        inputBorder: '#374151',
        inputText: '#ffffff',
        toggleBg: '#1f2937',
        roleTabBg: '#1f2937',
        roleTabBorder: '#374151',
        roleTabActiveBg: '#818cf8', // Navy Accent color
        roleTabActiveText: '#090d16',
        roleTabInactiveText: '#94a3b8',
        forgotText: '#818cf8',
        submitBtnBg: '#818cf8',
        submitBtnText: '#090d16',
      };
    } else if (role === 'restaurant') {
      // Fixed Slate Theme
      return {
        background: '#0f172a',
        card: '#1e293b',
        text: '#ffffff',
        subtext: '#cbd5e1',
        inputBg: '#1e293b',
        inputBorder: '#334155',
        inputText: '#ffffff',
        toggleBg: '#1e293b',
        roleTabBg: '#1e293b',
        roleTabBorder: '#334155',
        roleTabActiveBg: '#e2e8f0', // Slate Accent color
        roleTabActiveText: '#0f172a',
        roleTabInactiveText: '#94a3b8',
        forgotText: '#e2e8f0',
        submitBtnBg: '#e2e8f0',
        submitBtnText: '#0f172a',
      };
    } else {
      // Customer Dynamic theme based on useThemeStore()
      if (isDark) {
        return {
          background: '#0f172a',
          card: '#1e293b',
          text: '#ffffff',
          subtext: '#94a3b8',
          inputBg: '#1e293b',
          inputBorder: '#334155',
          inputText: '#ffffff',
          toggleBg: '#1e293b',
          roleTabBg: '#1e293b',
          roleTabBorder: '#334155',
          roleTabActiveBg: '#E63946', // Customer Accent color
          roleTabActiveText: '#ffffff',
          roleTabInactiveText: '#94a3b8',
          forgotText: '#E63946',
          submitBtnBg: '#E63946',
          submitBtnText: '#ffffff',
        };
      } else {
        return {
          background: '#f5f7fa',
          card: '#ffffff',
          text: '#111111',
          subtext: '#666666',
          inputBg: '#f9f9f9',
          inputBorder: '#eeeeee',
          inputText: '#333333',
          toggleBg: '#f1f1f1',
          roleTabBg: '#f9f9f9',
          roleTabBorder: '#eeeeee',
          roleTabActiveBg: '#111111',
          roleTabActiveText: '#ffffff',
          roleTabInactiveText: '#777777',
          forgotText: '#E63946',
          submitBtnBg: '#111111',
          submitBtnText: '#ffffff',
        };
      }
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');

    try {
      const result = await login(email, password, role);

      if (result?.otpRequired) {
        Alert.alert('Verification Needed', '📧 A 6-digit OTP code has been sent to your email.');
        router.push('/verify-otp');
        return;
      }

      const loggedInUser = result.user;
      if (loggedInUser) {
        Alert.alert('Login Successful', `Welcome back, ${loggedInUser.name}!`);
        if (loggedInUser.role === 'admin') {
          router.replace('/admin/dashboard');
        } else if (loggedInUser.role === 'restaurant') {
          router.replace('/restaurant/dashboard');
        } else {
          router.replace('/restaurants');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    }
  };

  const colors = getThemeColors();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
            <Text style={[styles.backButtonText, { color: colors.forgotText }]}>← Back</Text>
          </TouchableOpacity>

          <View style={[styles.authBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.heading, { color: colors.text }]}>Campus Food</Text>
            <Text style={[styles.subtext, { color: colors.subtext }]}>Order food from campus outlets</Text>

            {/* Toggle between Login and Signup */}
            <View style={[styles.toggleContainer, { backgroundColor: colors.toggleBg }]}>
              <TouchableOpacity style={[styles.toggleBtn, { backgroundColor: colors.roleTabActiveBg }]}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.roleTabActiveText }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toggleBtn} onPress={() => router.replace('/register')}>
                <Text style={[styles.toggleBtnText, { color: colors.roleTabInactiveText }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Role Selector Tabs */}
            <View style={[styles.roleContainer, { backgroundColor: colors.roleTabBg, borderColor: colors.roleTabBorder }]}>
              <TouchableOpacity
                style={[styles.roleTab, role === 'user' && { backgroundColor: colors.roleTabActiveBg }]}
                onPress={() => setRole('user')}
              >
                <Text style={[styles.roleTabText, { color: role === 'user' ? colors.roleTabActiveText : colors.roleTabInactiveText }]}>Customer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleTab, role === 'restaurant' && { backgroundColor: colors.roleTabActiveBg }]}
                onPress={() => setRole('restaurant')}
              >
                <Text style={[styles.roleTabText, { color: role === 'restaurant' ? colors.roleTabActiveText : colors.roleTabInactiveText }]}>Partner</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleTab, role === 'admin' && { backgroundColor: colors.roleTabActiveBg }]}
                onPress={() => setRole('admin')}
              >
                <Text style={[styles.roleTabText, { color: role === 'admin' ? colors.roleTabActiveText : colors.roleTabInactiveText }]}>Admin</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <Text style={[styles.label, { color: colors.text }]}>Email Address</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
                placeholder="you@university.edu"
                placeholderTextColor={role === 'user' && !isDark ? '#999' : '#64748b'}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={[styles.label, { color: colors.text }]}>Password</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
                placeholder="••••••••"
                placeholderTextColor={role === 'user' && !isDark ? '#999' : '#64748b'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity onPress={() => router.push('/forgot-password')} style={styles.forgotBtn}>
                <Text style={[styles.forgotBtnText, { color: colors.forgotText }]}>Forgot Password?</Text>
              </TouchableOpacity>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity
                style={[styles.submitBtn, { backgroundColor: colors.submitBtnBg }, isLoading && styles.submitBtnDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.submitBtnText} />
                ) : (
                  <Text style={[styles.submitBtnText, { color: colors.submitBtnText }]}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#E63946',
    fontWeight: '600',
  },
  authBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 60,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 30,
    marginBottom: 20,
    padding: 5,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
  },
  toggleBtnActive: {
    backgroundColor: '#E63946',
  },
  toggleBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  toggleBtnTextActive: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 25,
    padding: 3,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  roleTabActive: {
    backgroundColor: '#111',
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777',
  },
  roleTabTextActive: {
    color: '#fff',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  errorText: {
    color: '#E63946',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    height: 52,
    justifyContent: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: -10,
  },
  forgotBtnText: {
    color: '#E63946',
    fontWeight: '600',
    fontSize: 14,
  },
});
