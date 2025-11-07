import { createContext, useState } from "react";

export const CartDrawerContext = createContext();

export function CartDrawerProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartDrawerContext.Provider value={{ isCartOpen, openCart, closeCart }}>
      {children}
    </CartDrawerContext.Provider>
  );
}
