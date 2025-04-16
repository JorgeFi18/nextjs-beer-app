'use client';

import { useState, useEffect } from 'react';

interface QuantitySelectorProps {
  initialValue?: number;
  onChange?: (value: number) => void;
}

export default function QuantitySelector({ 
  initialValue = 1, 
  onChange 
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue);

  useEffect(() => {
    // Notify parent component when quantity changes
    if (onChange) {
      onChange(quantity);
    }
  }, [quantity, onChange]);

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button 
        onClick={decrease}
        className="w-8 h-8 flex items-center justify-center border-2 border-gray-500 rounded-md"
      >
        <span className="text-xl text-gray-500">-</span>
      </button>
      <span className="mx-4 text-xl font-medium text-gray-500">{quantity}</span>
      <button
        onClick={increase}
        className="w-8 h-8 flex items-center justify-center border-2 border-gray-500 rounded-md"
      >
        <span className="text-xl text-gray-500">+</span>
      </button>
    </div>
  );
} 