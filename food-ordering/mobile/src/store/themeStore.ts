import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => Promise<void>;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  
  loadTheme: async () => {
    try {
      const stored = await AsyncStorage.getItem('appTheme');
      if (stored === 'dark' || stored === 'light') {
        set({ theme: stored });
      }
    } catch (err) {
      console.error('Failed to load theme:', err);
    }
  },

  toggleTheme: async () => {
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('appTheme', nextTheme).catch((err) =>
        console.error('Failed to save theme:', err)
      );
      return { theme: nextTheme };
    });
  },
}));
