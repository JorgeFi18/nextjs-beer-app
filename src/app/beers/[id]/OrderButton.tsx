'use client';

import { useCart } from '@/app/context/CartContext';
import { useState, useEffect } from 'react';
import { getBeerById, Beer } from '@/lib/firestoreUtils';

interface OrderButtonProps {
  onClick?: () => void;
  quantity?: number;
  beerId?: string;
}

export default function OrderButton({ onClick, quantity = 1, beerId }: OrderButtonProps) {
  const { addToCart } = useCart();
  const [beer, setBeer] = useState<Beer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBeer = async () => {
      if (beerId) {
        const beerData = await getBeerById(beerId);
        setBeer(beerData);
      }
    };
    
    fetchBeer();
  }, [beerId]);

  const handleClick = async () => {
    if (onClick) {
      onClick();
      return;
    }
    
    if (!beer) return;
    
    setIsLoading(true);
    
    try {
      addToCart(beer, quantity);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isLoading || !beer}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-lg text-xl transition duration-200 disabled:bg-gray-400"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}