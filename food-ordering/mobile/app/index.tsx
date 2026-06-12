import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useThemeStore } from '../src/store/themeStore';

export default function WelcomeScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#0f172a' : '#ffffff',
    text: isDark ? '#ffffff' : '#111111',
    description: isDark ? '#cbd5e1' : '#555555',
    subtext: isDark ? '#94a3b8' : '#666666',
    cardBg: isDark ? '#1e293b' : '#f9f9f9',
    featureTitle: isDark ? '#ffffff' : '#222222',
    featureDesc: isDark ? '#cbd5e1' : '#666666',
    featureCardBg: isDark ? '#1e293b' : '#fff',
    border: isDark ? '#334155' : '#eee',
    btnSecondary: isDark ? '#1e293b' : '#f1f1f1',
    btnSecondaryText: isDark ? '#ffffff' : '#333333',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.heroTop}>
            <Image
              source={{ uri: 'https://image2url.com/images/1762957718911-cb36f4d6-f6f0-4544-9f69-44c686d3ad14.png' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>Campus Food Ordering</Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Skip the Line,{"\n"}
            <Text style={styles.highlight}>Save Your Time</Text>
          </Text>

          <Text style={[styles.description, { color: colors.description }]}>
            Order food from your favorite campus outlets and pick it up when it’s ready.
            No more waiting in long queues!
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/register')}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.secondaryButton, { backgroundColor: colors.btnSecondary }]} 
              onPress={() => router.push('/login')}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.btnSecondaryText }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FEATURES SECTION */}
        <View style={[styles.featuresSection, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Why Choose Campus Food?</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.subtext }]}>
            We make ordering food on campus easier, faster, and more convenient.
          </Text>

          <View style={[styles.featureCard, { backgroundColor: colors.featureCardBg, shadowOpacity: isDark ? 0.3 : 0.1, borderColor: colors.border, borderWidth: isDark ? 1 : 0 }]}>
            <Text style={styles.icon}>🍽️</Text>
            <Text style={[styles.featureTitle, { color: colors.featureTitle }]}>Multiple Outlets</Text>
            <Text style={[styles.featureDesc, { color: colors.featureDesc }]}>Order from various food outlets across campus</Text>
          </View>

          <View style={[styles.featureCard, { backgroundColor: colors.featureCardBg, shadowOpacity: isDark ? 0.3 : 0.1, borderColor: colors.border, borderWidth: isDark ? 1 : 0 }]}>
            <Text style={styles.icon}>⏰</Text>
            <Text style={[styles.featureTitle, { color: colors.featureTitle }]}>Quick Pickup</Text>
            <Text style={[styles.featureDesc, { color: colors.featureDesc }]}>Choose your pickup time and skip the queue</Text>
          </View>
          
          <View style={[styles.featureCard, { backgroundColor: colors.featureCardBg, shadowOpacity: isDark ? 0.3 : 0.1, borderColor: colors.border, borderWidth: isDark ? 1 : 0 }]}>
            <Text style={styles.icon}>📱</Text>
            <Text style={[styles.featureTitle, { color: colors.featureTitle }]}>Mobile Friendly</Text>
            <Text style={[styles.featureDesc, { color: colors.featureDesc }]}>Order from anywhere on campus right from your phone</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  heroTop: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
    marginBottom: 15,
  },
  highlight: {
    color: '#E63946', // A vibrant red/brand color
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 24,
    marginBottom: 30,
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'column',
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#E63946',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresSection: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222',
  },
  featureDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  }
});
