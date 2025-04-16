'use client';

import { useCart } from '@/app/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link 
            href="/" 
            className="inline-block bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
          >
            Browse Beers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <button 
          onClick={clearCart}
          className="text-red-600 text-sm flex items-center"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear Cart
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.beer.id} className="p-4 flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium">{item.beer.name}</h3>
                <p className="text-gray-600">{formatCurrency(item.beer.price)}</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => updateQuantity(item.beer.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md"
                >
                  -
                </button>
                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.beer.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md"
                >
                  +
                </button>
                <button 
                  onClick={() => removeFromCart(item.beer.id)}
                  className="ml-4 text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between text-lg font-medium">
            <span>Total:</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <button 
            className="w-full mt-4 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 