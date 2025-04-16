'use client';

import { useState } from 'react';
import { Order } from '@/lib/firestoreUtils';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

interface OrderTabsProps {
  inProgressOrders: Order[];
  pastOrders: Order[];
}

export default function OrderTabs({ inProgressOrders, pastOrders }: OrderTabsProps) {
  const [activeTab, setActiveTab] = useState<'inProgress' | 'past'>('inProgress');

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('inProgress')}
          className={`py-3 px-6 font-medium text-lg ${
            activeTab === 'inProgress'
              ? 'text-black border-b-2 border-black'
              : 'text-gray-500'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`py-3 px-6 font-medium text-lg ${
            activeTab === 'past'
              ? 'text-black border-b-2 border-black'
              : 'text-gray-500'
          }`}
        >
          Past Orders
        </button>
      </div>

      {/* Order List */}
      <div className="p-4">
        {activeTab === 'inProgress' ? (
          <OrderList orders={inProgressOrders} />
        ) : (
          <OrderList orders={pastOrders} />
        )}
      </div>
    </div>
  );
}

interface OrderListProps {
  orders: Order[];
}

function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return <div className="text-center py-8 text-gray-500">No orders found</div>;
  }
  
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link href={`/orders/${order.id}`} key={order.id}>
          <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            {/* Order Image - using placeholder for now */}
            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden relative">
              <div className="w-full h-full bg-gray-300 animate-pulse"></div>
            </div>
            
            <div className="ml-4 flex flex-1 justify-between">
              <div>
                <h3 className="text-xl font-semibold text-black">{order.displayName}</h3>
                <p className="text-gray-500">
                  {order.totalItems || 0} items • {formatCurrency(order.subtotal)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 