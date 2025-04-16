import { render, screen } from '@testing-library/react';
import CartButton from '../CartButton';
import { useCart } from '@/app/context/CartContext';

// Mock the useCart hook
jest.mock('@/app/context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('CartButton', () => {
  it('renders without badge when cart is empty', () => {
    // Mock the useCart hook to return empty cart
    (useCart as jest.Mock).mockReturnValue({
      totalItems: 0,
    });

    render(<CartButton />);
    
    // Check that the button is rendered
    expect(screen.getByText('Cart')).toBeInTheDocument();
    
    // The badge should not be visible
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('renders with badge showing item count', () => {
    // Mock the useCart hook to return non-empty cart
    (useCart as jest.Mock).mockReturnValue({
      totalItems: 5,
    });

    render(<CartButton />);
    
    // Check that the button is rendered
    expect(screen.getByText('Cart')).toBeInTheDocument();
    
    // The badge should be visible with correct count
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows 99+ for large item counts', () => {
    // Mock the useCart hook to return large item count
    (useCart as jest.Mock).mockReturnValue({
      totalItems: 100,
    });

    render(<CartButton />);
    
    // Check that the badge shows 99+ for large numbers
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    (useCart as jest.Mock).mockReturnValue({
      totalItems: 1,
    });

    const { container } = render(<CartButton className="custom-class" />);
    
    // Check that the custom class is applied
    expect(container.firstChild).toHaveClass('custom-class');
  });
}); 