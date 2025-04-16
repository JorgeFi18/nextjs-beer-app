import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrderButton from '../OrderButton';
import { useCart } from '@/app/context/CartContext';
import { getBeerById } from '@/lib/firestoreUtils';

// Mock dependencies
jest.mock('@/app/context/CartContext', () => ({
  useCart: jest.fn(),
}));

jest.mock('@/lib/firestoreUtils', () => ({
  getBeerById: jest.fn(),
}));

// Mock window.alert
const originalAlert = window.alert;
const alertMock = jest.fn();

describe('OrderButton', () => {
  const mockBeer = {
    id: '123',
    name: 'Test Beer',
    price: 15000,
    rating: 4.5,
  };

  const mockAddToCart = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
    (getBeerById as jest.Mock).mockResolvedValue(mockBeer);
    
    // Setup alert mock
    window.alert = alertMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.alert = originalAlert;
  });

  it('renders the button with "Add to Cart" text', async () => {
    render(<OrderButton beerId="123" quantity={2} />);
    
    expect(await screen.findByText('Add to Cart')).toBeInTheDocument();
  });

  it('fetches beer data on mount', () => {
    render(<OrderButton beerId="123" quantity={1} />);
    
    expect(getBeerById).toHaveBeenCalledWith('123');
  });

  it('adds beer to cart with correct quantity when clicked', async () => {
    render(<OrderButton beerId="123" quantity={3} />);
    
    // Wait for the component to fetch beer data
    await waitFor(() => expect(getBeerById).toHaveBeenCalled());
    
    // Click the button
    fireEvent.click(screen.getByText('Add to Cart'));
    
    // Check if addToCart was called with the right arguments
    expect(mockAddToCart).toHaveBeenCalledWith(mockBeer, 3);
    expect(alertMock).toHaveBeenCalledWith('Added to cart!');
  });

  it('is disabled when beer data is not available', async () => {
    // Mock getBeerById to return null
    (getBeerById as jest.Mock).mockResolvedValue(null);
    
    render(<OrderButton beerId="123" quantity={1} />);
    
    // Wait for the component to try to fetch beer data
    await waitFor(() => expect(getBeerById).toHaveBeenCalled());
    
    // Button should be disabled
    expect(screen.getByText('Add to Cart')).toBeDisabled();
  });
}); 