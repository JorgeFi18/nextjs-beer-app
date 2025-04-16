import { getOrdersByStatus } from '@/lib/firestoreUtils';
import OrderTabs from './OrderTabs';

export default async function OrdersPage() {
  // Get unpaid orders (in progress)
  const rawInProgressOrders = await getOrdersByStatus(false);
  // Get paid orders (past orders)
  const rawPastOrders = await getOrdersByStatus(true);

  // Sanitize the data by converting to and from JSON to remove any non-serializable properties
  const inProgressOrders = JSON.parse(JSON.stringify(rawInProgressOrders));
  const pastOrders = JSON.parse(JSON.stringify(rawPastOrders));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-6">
        <h1 className="text-4xl font-bold text-black">Your Orders</h1>
        <p className="text-gray-500 mt-1">Wait for the best meal</p>
      </div>

      <OrderTabs inProgressOrders={inProgressOrders} pastOrders={pastOrders} />
    </div>
  );
}