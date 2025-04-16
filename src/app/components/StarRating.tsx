'use client';

type ColorOptions = 'rose' | 'red' | 'yellow' | 'orange' | 'blue';
type SizeOptions = 'sm' | 'md' | 'lg';

interface StarRatingProps {
  rating: number;
  size?: SizeOptions;
  showValue?: boolean;
  color?: ColorOptions;
}

export default function StarRating({ 
  rating, 
  size = 'md', 
  showValue = true, 
  color = 'rose' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };
  
  const colorClasses = {
    rose: 'text-rose-400',
    red: 'text-red-500',
    yellow: 'text-yellow-400',
    orange: 'text-orange-500',
    blue: 'text-blue-500'
  };
  
  // Round to nearest 0.5 for display (e.g., 3.7 becomes 3.5)
  const displayRating = Math.round(rating * 2) / 2;
  
  return (
    <div className="flex items-center">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClasses[size]} ${star <= displayRating ? colorClasses[color] : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* For half stars */}
            {star === Math.ceil(displayRating) && displayRating % 1 !== 0 ? (
              <defs>
                <linearGradient id={`halfStar${star}`}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
            ) : null}
            
            <path
              fillRule="evenodd"
              fill={star === Math.ceil(displayRating) && displayRating % 1 !== 0 ? `url(#halfStar${star})` : "currentColor"}
              d="M10 15l-5.545 3.023 1.18-6.618L0 6.26l6.745-.52L10 0l3.255 5.74L20 6.26l-5.635 5.145 1.18 6.618L10 15z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      {showValue && (
        <span className="ml-2 text-gray-500">{displayRating.toFixed(1)}</span>
      )}
    </div>
  );
} 