export default function BeerListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center bg-white p-4 rounded-lg shadow-md animate-pulse">
          <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
          <div className="ml-4 flex-1">
            <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-4 h-4 rounded-full bg-gray-200"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 