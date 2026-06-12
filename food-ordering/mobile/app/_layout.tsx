import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '../src/store/authStore';
import { useCartStore } from '../src/store/cartStore';
import { useThemeStore } from '../src/store/themeStore';

const queryClient = new QueryClient();

export default function RootLayout() {
  const loadStoredUser = useAuthStore((state) => state.loadStoredUser);
  const loadStoredCart = useCartStore((state) => state.loadStoredCart);
  const loadTheme = useThemeStore((state) => state.loadTheme);

  useEffect(() => {
    loadStoredUser();
    loadStoredCart();
    loadTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Customer Screens */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="verify-otp" />
        <Stack.Screen name="restaurants/index" />
        <Stack.Screen name="restaurants/[id]" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="orders" />
        <Stack.Screen name="profile" />

        {/* Restaurant Portal */}
        <Stack.Screen name="restaurant/login" />
        <Stack.Screen name="restaurant/dashboard" />
        <Stack.Screen name="restaurant/orders" />
        <Stack.Screen name="restaurant/menu" />
        <Stack.Screen name="restaurant/profile" />

        {/* Admin Portal */}
        <Stack.Screen name="admin/login" />
        <Stack.Screen name="admin/dashboard" />
        <Stack.Screen name="admin/outlets" />
        <Stack.Screen name="admin/orders" />
      </Stack>
    </QueryClientProvider>
  );
}
