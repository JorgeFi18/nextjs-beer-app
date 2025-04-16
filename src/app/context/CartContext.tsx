'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Beer } from '@/lib/firestoreUtils';

interface CartItem {
  beer: Beer;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (beer: Beer, quantity: number) => void;
  removeFromCart: (beerId: string) => void;
  updateQuantity: (beerId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Initialize cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse saved cart:", error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addToCart = (beer: Beer, quantity: number) => {
    setItems(prev => {
      const exists = prev.find(item => item.beer.id === beer.id);
      if (exists) {
        return prev.map(item => 
          item.beer.id === beer.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { beer, quantity }];
    });
  };
  
  const removeFromCart = (beerId: string) => {
    setItems(prev => prev.filter(item => item.beer.id !== beerId));
  };
  
  const updateQuantity = (beerId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(beerId);
      return;
    }
    
    setItems(prev => 
      prev.map(item => 
        item.beer.id === beerId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.beer.price * item.quantity), 
    0
  );
  
  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 