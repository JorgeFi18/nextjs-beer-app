'use client';

import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  className?: string;
}

export default function CartButton({ className = '' }: CartButtonProps) {
  const { totalItems } = useCart();
  
  return (
    <Link 
      href="/cart" 
      className={`relative inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${className}`}
    >
      <ShoppingCart className="h-5 w-5 mr-1" />
      <span>Cart</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
} 