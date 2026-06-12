import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { useThemeStore } from '../src/store/themeStore';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { forgotPassword, resetPassword, isLoading } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#0f172a' : '#f5f7fa',
    card: isDark ? '#1e293b' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    subtext: isDark ? '#cbd5e1' : '#666666',
    inputBg: isDark ? '#1e293b' : '#f9f9f9',
    inputBorder: isDark ? '#334155' : '#eeeeee',
    inputText: isDark ? '#ffffff' : '#333333',
    submitBtnBg: '#E63946',
    submitBtnText: '#ffffff',
    forgotText: '#E63946',
  };

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRequestOTP = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');

    try {
      await forgotPassword(email);
      Alert.alert('OTP Sent', '📧 A 4-digit password reset OTP has been sent to your email.');
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to request password reset OTP.');
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');

    try {
      await resetPassword(email, otp, newPassword);
      Alert.alert('Success 🎉', 'Your password has been reset successfully. You can now log in.');
      router.replace('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => step === 2 ? setStep(1) : router.replace('/login')}
          >
            <Text style={[styles.backButtonText, { color: colors.forgotText }]}>← Back</Text>
          </TouchableOpacity>

          <View style={[styles.authBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.heading, { color: colors.text }]}>Reset Password</Text>
            
            {step === 1 ? (
              <View style={styles.form}>
                <Text style={[styles.subtext, { color: colors.subtext }]}>
                  Enter your email address and we'll send you a 4-digit code to reset your password.
                </Text>
                
                <Text style={[styles.label, { color: colors.text }]}>Email Address</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
                  placeholder="you@university.edu"
                  placeholderTextColor={!isDark ? '#999' : '#64748b'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity 
                  style={[styles.submitBtn, { backgroundColor: colors.submitBtnBg }, isLoading && styles.submitBtnDisabled]} 
                  onPress={handleRequestOTP}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color={colors.submitBtnText} />
                  ) : (
                    <Text style={[styles.submitBtnText, { color: colors.submitBtnText }]}>Send OTP</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.form}>
                <Text style={[styles.subtext, { color: colors.subtext }]}>
                  We sent a code to <Text style={[styles.boldText, { color: colors.text }]}>{email}</Text>. Please enter it below along with your new password.
                </Text>

                <Text style={[styles.label, { color: colors.text }]}>Verification Code</Text>
                <TextInput
                  style={[styles.input, styles.otpInput, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
                  placeholder="4-digit code"
                  placeholderTextColor={!isDark ? '#999' : '#64748b'}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={otp}
                  onChangeText={setOtp}
                />

                <Text style={[styles.label, { color: colors.text }]}>New Password</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
                  placeholder="••••••••"
                  placeholderTextColor={!isDark ? '#999' : '#64748b'}
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />

                <Text style={[styles.label, { color: colors.text }]}>Confirm New Password</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.inputText }]}
                  placeholder="••••••••"
                  placeholderTextColor={!isDark ? '#999' : '#64748b'}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity 
                  style={[styles.submitBtn, { backgroundColor: colors.submitBtnBg }, isLoading && styles.submitBtnDisabled]} 
                  onPress={handleResetPassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color={colors.submitBtnText} />
                  ) : (
                    <Text style={[styles.submitBtnText, { color: colors.submitBtnText }]}>Reset Password</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.resendBtn} onPress={() => setStep(1)}>
                  <Text style={[styles.resendText, { color: colors.subtext }]}>Didn't get the code? Edit Email / Resend</Text>
                </TouchableOpacity>
              </View>
            )}
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
    marginBottom: 15,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
  },
  boldText: {
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
  otpInput: {
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 4,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E63946',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: '#E63946',
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
  resendBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendText: {
    color: '#666',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
