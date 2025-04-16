'use client';

import Link from 'next/link';
import { Beer } from '@/lib/firestoreUtils';
import StarRating from './StarRating';
import { formatCurrency } from '@/lib/utils';

interface BeerCardProps {
  beer: Beer;
  showRating?: boolean;
}

export default function BeerCard({ beer, showRating = true }: BeerCardProps) {
  return (
    <Link href={`/beers/${beer.id}`}>
      <div className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-lg"></div>
        <div className="ml-4 flex flex-1 justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{beer.name}</h3>
            <p className="text-gray-500">{formatCurrency(beer.price)}</p>
          </div>
          {showRating && (
            <div>
              <StarRating rating={beer.rating || 3} size="sm" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 