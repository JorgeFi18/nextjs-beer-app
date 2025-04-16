'use client';

import { useState } from 'react';
import { seedOrders } from '@/lib/firestoreUtils';

export default function SeedButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      
      const result = await seedOrders();
      
      setMessage(result);
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSeed}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {isLoading ? 'Seeding...' : 'Seed Sample Orders'}
      </button>
      
      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
} 