import { getOrderById, Order, OrderRound, OrderItem } from '@/lib/firestoreUtils';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const rawOrder = await getOrderById(id);

  if (!rawOrder) {
    notFound();
  }

  // Sanitize the data to remove any non-serializable properties
  const order = JSON.parse(JSON.stringify(rawOrder)) as Order;

  // Helper function to format date strings or timestamps
  const formatDate = (dateStr: number) => {
    try {
      // If the date is stored as an ISO string
      return new Date(dateStr).toLocaleString();
    } catch {
      return 'Date unavailable';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with back button */}
      <div className="relative h-64 w-full">
        <div className="h-64 bg-gray-200 animate-pulse"></div>
        <Link href="/orders" className="absolute top-6 left-6 bg-white p-2 rounded-full shadow-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </Link>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">{order.displayName}</h1>
          <span className={`px-3 py-1 text-sm rounded-full ${order.paid ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {order.paid ? 'Completed' : 'In Progress'}
          </span>
        </div>

        <p className="text-gray-500 mt-2">Order #{order.id.slice(0, 6)}</p>
        {/* Order summary */}
        <div className="mt-8">
          <h2 className="text-gray-500 text-xl font-semibold mb-4">Order Summary</h2>
          {order.rounds && order.rounds.length > 0 ? (
            <div className="space-y-6">
              {order.rounds.map((round: OrderRound, roundIndex: number) => (
                <div key={roundIndex} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-500">Round {roundIndex + 1}</h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(round.created.nanoseconds)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {round.items.map((item: OrderItem, itemIndex: number) => (
                      <div key={itemIndex} className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-md mr-3 text-gray-500"></div>
                          <span className="text-gray-600">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-600">{item.quantity}x</div>
                          {item.price && <div className="text-sm text-gray-600">{formatCurrency(item.price)}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No items in this order</p>
          )}
        </div>
        {/* Order total */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-600">{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Taxes</span>
            <span className="text-gray-600">{formatCurrency(order.taxes)}</span>
          </div>
          {order.discounts > 0 && (
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Discounts</span>
              <span className="text-green-600">-{formatCurrency(order.discounts)}</span>
            </div>
          )}
          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span className="text-gray-600">Total</span>
            <span className="text-gray-600">{formatCurrency(order.subtotal + order.taxes - order.discounts)}</span>
          </div>
        </div>
        {/* Action button */}
        <div className="mt-8">
          <button
            className={`w-full py-4 px-4 rounded-lg text-white text-xl font-semibold ${
              order.paid ? 'bg-gray-400' : 'bg-red-600 active:bg-red-700'
            }`}
            disabled={order.paid}
          >
            {order.paid ? 'Order Completed' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}