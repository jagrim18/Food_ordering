import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { useThemeStore } from '../src/store/themeStore';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { verifyOTP, resendOTP, pendingEmail, pendingRole, isLoading } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(120); // 2 minutes cooldown
  const [canResend, setCanResend] = useState(false);

  const getThemeColors = () => {
    const role = pendingRole || 'user';
    if (role === 'admin') {
      return {
        background: '#090d16',
        card: '#111827',
        text: '#ffffff',
        subtext: '#9ca3af',
        inputBg: '#1f2937',
        inputBorder: '#374151',
        inputText: '#ffffff',
        submitBtnBg: '#818cf8',
        submitBtnText: '#090d16',
        forgotText: '#818cf8',
      };
    } else if (role === 'restaurant') {
      return {
        background: '#0f172a',
        card: '#1e293b',
        text: '#ffffff',
        subtext: '#cbd5e1',
        inputBg: '#1e293b',
        inputBorder: '#334155',
        inputText: '#ffffff',
        submitBtnBg: '#e2e8f0',
        submitBtnText: '#0f172a',
        forgotText: '#e2e8f0',
      };
    } else {
      if (isDark) {
        return {
          background: '#0f172a',
          card: '#1e293b',
          text: '#ffffff',
          subtext: '#94a3b8',
          inputBg: '#1e293b',
          inputBorder: '#334155',
          inputText: '#ffffff',
          submitBtnBg: '#E63946',
          submitBtnText: '#ffffff',
          forgotText: '#E63946',
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
          submitBtnBg: '#111111',
          submitBtnText: '#ffffff',
          forgotText: '#E63946',
        };
      }
    }
  };

  useEffect(() => {
    if (!pendingEmail) {
      Alert.alert('Error', 'No verification session active. Please login or register first.');
      router.replace('/login');
      return;
    }

    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [cooldown, pendingEmail]);

  const handleVerify = async () => {
    if (otp.length < 4) {
      setError('Please enter a valid OTP.');
      return;
    }
    setError('');

    try {
      const user = await verifyOTP(otp);
      Alert.alert('Success', `Welcome, ${user.name}!`);
      
      // Role-based routing
      if (user.role === 'admin') {
        router.replace('/admin/dashboard');
      } else if (user.role === 'restaurant') {
        router.replace('/restaurant/dashboard');
      } else {
        router.replace('/restaurants');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Try again.');
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    try {
      await resendOTP();
      setCooldown(120);
      setCanResend(false);
      Alert.alert('Success', 'OTP resend successful. Please check your email inbox.');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to resend OTP.');
    }
  };

  const colors = getThemeColors();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/login')}>
            <Text style={[styles.backButtonText, { color: colors.forgotText }]}>← Back to Login</Text>
          </TouchableOpacity>

          <View style={[styles.authBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.heading, { color: colors.text }]}>Verify OTP</Text>
            <Text style={[styles.subtext, { color: colors.subtext }]}>
              We sent a verification code to:{'\n'}
              <Text style={[styles.emailHighlight, { color: colors.text }]}>{pendingEmail}</Text>
            </Text>

            <View style={styles.form}>
              <Text style={[styles.label, { color: colors.text }]}>Enter Code</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
                placeholder="6-digit code"
                placeholderTextColor={pendingRole === 'user' && !isDark ? '#999' : '#64748b'}
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity 
                style={[styles.submitBtn, { backgroundColor: colors.submitBtnBg }, isLoading && styles.submitBtnDisabled]} 
                onPress={handleVerify}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.submitBtnText} />
                ) : (
                  <Text style={[styles.submitBtnText, { color: colors.submitBtnText }]}>Verify & Continue</Text>
                )}
              </TouchableOpacity>

              <View style={styles.resendContainer}>
                {canResend ? (
                  <TouchableOpacity onPress={handleResend}>
                    <Text style={[styles.resendLink, { color: colors.forgotText }]}>Resend OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={[styles.cooldownText, { color: colors.subtext }]}>
                    Resend code in {Math.floor(cooldown / 60)}:{(cooldown % 60).toString().padStart(2, '0')}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
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
    flex: 1,
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
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  emailHighlight: {
    fontWeight: 'bold',
    color: '#111',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 4,
    fontWeight: 'bold',
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
  resendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendLink: {
    color: '#E63946',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cooldownText: {
    color: '#999',
    fontSize: 14,
  },
});
