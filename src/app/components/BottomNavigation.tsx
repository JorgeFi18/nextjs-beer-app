'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isOrders = pathname === '/orders' || pathname.startsWith('/orders/');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex justify-between items-center">
      {/* Home Button */}
      <Link href="/">
        <div className={`${isHome ? 'text-red-600' : 'text-gray-300'} w-12 h-12 rounded-md flex items-center justify-center transition-colors`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12L12 3L21 12H18V21H6V12H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>

      {/* Cart Button with Notification */}
      <Link href="/orders">
        <div className="relative">
          <svg 
            className={`w-8 h-8 ${isOrders ? 'text-red-600' : 'text-gray-300'} transition-colors`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full w-3 h-3"></div>
        </div>
      </Link>

      {/* Profile Button */}
      <Link href="/">
        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </Link>
    </div>
  );
}