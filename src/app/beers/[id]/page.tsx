'use client';

import { use } from 'react';
import { getBeerById, Beer } from '@/lib/firestoreUtils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import QuantitySelector from './QuantitySelector';
import OrderButton from './OrderButton';
import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

interface BeerPageProps {
  params: Promise<{ id: string }>;
}

export default function BeerDetailPage({ params }: BeerPageProps) {
  const { id } = use(params);
  const [beer, setBeer] = useState<Beer | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadBeer() {
      try {
        const beerData = await getBeerById(id);
        if (!beerData) {
          notFound();
        }
        setBeer(beerData);
      } catch (error) {
        console.error('Error loading beer:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBeer();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!beer) {
    return <div className="min-h-screen flex items-center justify-center">Beer not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Beer Image */}
      <div className="relative h-64 w-full">
        <div className="h-64 bg-gray-200 animate-pulse"></div>
        <Link href="/" className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </Link>
      </div>

      <div className="p-6">
        <div className="mt-8 flex items-center justify-between">
            {/* Beer Name */}
            <h1 className="text-3xl font-bold text-black">{beer.name}</h1>
            <QuantitySelector 
              initialValue={quantity} 
              onChange={setQuantity}
            />
        </div>

        {/* Star Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${i < (beer.rating || 4) ? "text-red-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-500">{beer.rating || "4.5"}</span>
        </div>

        {/* Description */}
        <p className="mt-6 text-gray-500 leading-relaxed">
          {beer.description || "Makanan khas Bandung yang cukup sering dipesan oleh anak muda dengan pola makan yang cukup tinggi dengan mengutamakan diet yang sehat dan teratur."}
        </p>

        {/* Ingredients */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-black">Ingredients:</h2>
          <p className="mt-2 text-gray-500">
            {beer.ingredients || "Seledri, telur, blueberry, madu."}
          </p>
        </div>

        {/* Quantity and Price */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Price:</p>
            <p className="text-2xl font-bold text-black">{formatCurrency(beer.price * quantity)}</p>
          </div>
          <OrderButton quantity={quantity} beerId={id} />
        </div>
      </div>
    </div>
  );
}