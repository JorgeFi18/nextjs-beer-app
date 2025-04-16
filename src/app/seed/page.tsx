import SeedButton from './SeedButton';

export default async function SeedPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Seed Sample Data</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <p className="mb-4 text-gray-600">
          This will add 4 sample orders to your Firestore database:
          <ul className="list-disc ml-6 mt-2">
            <li>2 in-progress orders (unpaid)</li>
            <li>2 completed orders (paid)</li>
          </ul>
        </p>

        <SeedButton />
      </div>
    </div>
  );
}