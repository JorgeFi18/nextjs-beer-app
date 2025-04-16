import { render, screen } from '@testing-library/react';
import BeerCard from '../BeerCard';
import { Beer } from '@/lib/firestoreUtils';

// Mock the StarRating component
jest.mock('../StarRating', () => {
  return {
    __esModule: true,
    default: ({ rating }: { rating: number }) => (
      <div data-testid="mock-star-rating">Stars: {rating}</div>
    )
  };
});

// Mock the Next.js Link component
jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ href, children }: { href: string, children: React.ReactNode }) => (
      <a href={href} data-testid="next-link">
        {children}
      </a>
    )
  };
});

describe('BeerCard', () => {
  const mockBeer: Beer = {
    id: 'beer-123',
    name: 'Test Beer',
    price: 15000,
    rating: 4.2,
    description: 'A delicious test beer',
    category: 'IPA',
  };

  it('renders the beer name', () => {
    render(<BeerCard beer={mockBeer} />);
    expect(screen.getByText('Test Beer')).toBeInTheDocument();
  });

  it('links to the beer detail page', () => {
    render(<BeerCard beer={mockBeer} />);
    const link = screen.getByTestId('next-link');
    expect(link).toHaveAttribute('href', '/beers/beer-123');
  });

  it('shows the star rating component when showRating is true', () => {
    render(<BeerCard beer={mockBeer} showRating={true} />);
    const starRating = screen.getByTestId('mock-star-rating');
    expect(starRating).toBeInTheDocument();
    expect(starRating).toHaveTextContent('Stars: 4.2');
  });

  it('does not show the star rating component when showRating is false', () => {
    render(<BeerCard beer={mockBeer} showRating={false} />);
    expect(screen.queryByTestId('mock-star-rating')).not.toBeInTheDocument();
  });

  it('shows the star rating by default when showRating is not provided', () => {
    render(<BeerCard beer={mockBeer} />);
    expect(screen.getByTestId('mock-star-rating')).toBeInTheDocument();
  });

  it('handles beers without ratings', () => {
    const beerWithoutRating = { ...mockBeer, rating: undefined };
    render(<BeerCard beer={beerWithoutRating} />);
    const starRating = screen.getByTestId('mock-star-rating');
    expect(starRating).toHaveTextContent('Stars: 3'); // Default rating value is 3
  });
});