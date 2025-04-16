import Link from 'next/link'
import { getBeers } from "@/lib/firestoreUtils";
import BeerCard from './components/BeerCard';
import StarRating from './components/StarRating';

async function HomePage() {
  const { beers } = await getBeers();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">FoodMarket</h1>
          <p className="text-gray-500">Lets get some foods</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-800">A</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Featured Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-40 bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">Cherry Healthy</h2>
              <div className="flex items-center">
                <StarRating rating={4.5} size="sm" />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-40 bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">Burger Tamor</h2>
              <div className="flex items-center">
                <StarRating rating={4.2} size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Beer List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Beer list</h2>
          {beers.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500">No beers found. Try adding some or seed the database.</p>
              <Link href="/seed" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md">
                Seed Database
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {beers.map((beer, idx) => (
                <BeerCard key={idx} beer={beer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;