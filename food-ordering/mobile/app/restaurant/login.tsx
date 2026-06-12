import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';

export default function RestaurantLoginScreen() {
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
      const result = await login(email, password, 'restaurant');

      if (result?.otpRequired) {
        Alert.alert('Verification Sent', '📧 OTP verification code sent to your email.');
        router.push('/verify-otp');
        return;
      }

      const loggedInUser = result.user;
      if (loggedInUser) {
        Alert.alert('Welcome Manager', `Logged in successfully: ${loggedInUser.name}`);
        router.replace('/restaurant/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Invalid credentials.');
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
            <Text style={styles.partnerTitle}>🏪 Partner Portal</Text>
            <Text style={styles.heading}>Manage Outlet</Text>
            <Text style={styles.subtext}>Sign in to accept orders and manage menus</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Manager Email</Text>
              <TextInput
                style={styles.input}
                placeholder="manager@university.edu"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
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
                  <Text style={styles.submitBtnText}>Sign In</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.signupLink} onPress={() => router.replace('/register')}>
                <Text style={styles.signupLinkText}>Don't have a partner account? Register here</Text>
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
    backgroundColor: '#0f172a', // sleek dark theme for partner portal
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
    color: '#38bdf8', // bright blue accent
    fontWeight: '600',
  },
  authBox: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  partnerTitle: {
    fontSize: 14,
    color: '#38bdf8',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
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
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
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
    backgroundColor: '#38bdf8',
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
    color: '#0f172a',
    fontSize: 17,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupLinkText: {
    color: '#94a3b8',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: -10,
  },
  forgotBtnText: {
    color: '#38bdf8',
    fontWeight: '600',
    fontSize: 14,
  },
});
