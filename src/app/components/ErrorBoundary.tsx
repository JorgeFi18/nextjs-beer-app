'use client';

import { useEffect, useState } from 'react';

interface ErrorFallbackProps {
  error?: Error | null;
}

type FallbackComponent = React.ComponentType<ErrorFallbackProps>;

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode | FallbackComponent;
}

export default function ErrorBoundary({ 
  children, 
  fallback = DefaultErrorFallback 
}: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      event.preventDefault();
      setHasError(true);
      setError(event.error);
    };

    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    if (typeof fallback === 'function') {
      const FallbackComponent = fallback as FallbackComponent;
      return <FallbackComponent error={error} />;
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

function DefaultErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div className="p-6 bg-red-50 rounded-lg border border-red-200">
      <h2 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h2>
      <p className="text-red-600 mb-4">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
} 