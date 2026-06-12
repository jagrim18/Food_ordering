import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  item: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
    isVeg?: boolean;
  };
  restaurantId: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem['item'], restaurantId: string, forceClear?: boolean) => { success: boolean; conflict?: boolean };
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  loadStoredCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  loadStoredCart: async () => {
    try {
      const stored = await AsyncStorage.getItem('cart');
      if (stored) {
        set({ cart: JSON.parse(stored) });
      }
    } catch (err) {
      console.error('Error loading stored cart:', err);
    }
  },

  addToCart: (item, restaurantId, forceClear = false) => {
    const { cart } = get();

    // Filter out corrupted items
    const cleanCart = cart.filter((c) => c?.item?._id && c.restaurantId);

    // Check for restaurant conflict
    if (cleanCart.length > 0 && cleanCart[0].restaurantId !== restaurantId) {
      if (!forceClear) {
        return { success: false, conflict: true };
      }
      // Force clear cart and add the new item
      const newCart = [{ item, restaurantId, quantity: 1 }];
      set({ cart: newCart });
      AsyncStorage.setItem('cart', JSON.stringify(newCart)).catch(console.error);
      return { success: true };
    }

    // Same restaurant or empty cart
    let newCart: CartItem[] = [];
    const existing = cleanCart.find((c) => c.item._id === item._id);
    if (existing) {
      newCart = cleanCart.map((c) =>
        c.item._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
      );
    } else {
      newCart = [...cleanCart, { item, restaurantId, quantity: 1 }];
    }

    set({ cart: newCart });
    AsyncStorage.setItem('cart', JSON.stringify(newCart)).catch(console.error);
    return { success: true };
  },

  removeFromCart: (itemId) => {
    const { cart } = get();
    const updated = cart
      .map((c) => (c.item?._id === itemId ? { ...c, quantity: c.quantity - 1 } : c))
      .filter((c) => c.quantity > 0);

    set({ cart: updated });
    AsyncStorage.setItem('cart', JSON.stringify(updated)).catch(console.error);
  },

  updateQuantity: (itemId, quantity) => {
    const { cart } = get();
    let updated: CartItem[] = [];
    if (quantity <= 0) {
      updated = cart.filter((c) => c.item?._id !== itemId);
    } else {
      updated = cart.map((c) => (c.item?._id === itemId ? { ...c, quantity } : c));
    }

    set({ cart: updated });
    AsyncStorage.setItem('cart', JSON.stringify(updated)).catch(console.error);
  },

  clearCart: () => {
    set({ cart: [] });
    AsyncStorage.removeItem('cart').catch(console.error);
  },
}));
