import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';

export default function AdminLoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');

    try {
      const result = await login(email, password, 'admin');

      if (result?.otpRequired) {
        Alert.alert('Verification Sent', '📧 OTP verification code sent to your email.');
        router.push('/verify-otp');
        return;
      }

      const loggedInUser = result.user;
      if (loggedInUser) {
        Alert.alert('Welcome Admin', `Logged in successfully: ${loggedInUser.name}`);
        router.replace('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Invalid administrator credentials.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
            <Text style={styles.backButtonText}>← Home</Text>
          </TouchableOpacity>

          <View style={styles.authBox}>
            <Text style={styles.adminTitle}>🛠️ Super Admin Portal</Text>
            <Text style={styles.heading}>System Control</Text>
            <Text style={styles.subtext}>Sign in to moderate system outlets and orders</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Admin Email</Text>
              <TextInput
                style={styles.input}
                placeholder="admin@university.edu"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity onPress={() => router.push('/forgot-password')} style={styles.forgotBtn}>
                <Text style={styles.forgotBtnText}>Forgot Password?</Text>
              </TouchableOpacity>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity 
                style={[styles.submitBtn, isLoading && styles.submitBtnDisabled]} 
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitBtnText}>Authenticate</Text>
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
    backgroundColor: '#090d16', // solid dark theme for admin portal
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
    color: '#818cf8', // indigo accent
    fontWeight: '600',
  },
  authBox: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  adminTitle: {
    fontSize: 13,
    color: '#818cf8',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtext: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#030712',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  errorText: {
    color: '#f87171',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: '#818cf8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    height: 52,
    justifyContent: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: '#030712',
    fontSize: 17,
    fontWeight: 'bold',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: -10,
  },
  forgotBtnText: {
    color: '#818cf8',
    fontWeight: '600',
    fontSize: 14,
  },
});
