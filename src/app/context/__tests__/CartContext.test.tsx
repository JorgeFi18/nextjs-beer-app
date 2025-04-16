import { render, screen, act } from '@testing-library/react';
import { useCart, CartProvider } from '../CartContext';
import { Beer } from '@/lib/firestoreUtils';

// Test component that uses the useCart hook
const TestComponent = () => {
  const { 
    items, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();

  return (
    <div>
      <div data-testid="total-items">{totalItems}</div>
      <div data-testid="total-price">{totalPrice}</div>
      <button data-testid="add-beer" onClick={() => addToCart(mockBeer, 1)}>Add Beer</button>
      <button data-testid="remove-beer" onClick={() => removeFromCart(mockBeer.id)}>Remove Beer</button>
      <button data-testid="update-quantity" onClick={() => updateQuantity(mockBeer.id, 3)}>Update Quantity</button>
      <button data-testid="clear-cart" onClick={clearCart}>Clear Cart</button>
      <ul data-testid="items-list">
        {items.map(item => (
          <li key={item.beer.id}>
            {item.beer.name} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Mock beer data
const mockBeer: Beer = {
  id: '1',
  name: 'Test Beer',
  price: 10000,
  rating: 4.5,
  description: 'A test beer',
  category: 'IPA',
  alcoholContent: 5,
  origin: 'Test Country',
  ingredients: 'Water, Malt, Hops, Yeast'
};

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it('initializes with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
    expect(screen.getByTestId('items-list').children.length).toBe(0);
  });

  it('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-beer').click();
    });

    expect(screen.getByTestId('total-items').textContent).toBe('1');
    expect(screen.getByTestId('total-price').textContent).toBe('10000');
    expect(screen.getByTestId('items-list').children.length).toBe(1);
    expect(screen.getByTestId('items-list').textContent).toContain('Test Beer - 1');
  });

  it('increases quantity when adding the same item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-beer').click();
      screen.getByTestId('add-beer').click();
    });

    expect(screen.getByTestId('total-items').textContent).toBe('2');
    expect(screen.getByTestId('total-price').textContent).toBe('20000');
    expect(screen.getByTestId('items-list').children.length).toBe(1);
    expect(screen.getByTestId('items-list').textContent).toContain('Test Beer - 2');
  });

  it('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-beer').click();
      screen.getByTestId('remove-beer').click();
    });

    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
    expect(screen.getByTestId('items-list').children.length).toBe(0);
  });

  it('updates quantity of item in cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-beer').click();
      screen.getByTestId('update-quantity').click();
    });

    expect(screen.getByTestId('total-items').textContent).toBe('3');
    expect(screen.getByTestId('total-price').textContent).toBe('30000');
    expect(screen.getByTestId('items-list').textContent).toContain('Test Beer - 3');
  });

  it('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-beer').click();
      screen.getByTestId('clear-cart').click();
    });

    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
    expect(screen.getByTestId('items-list').children.length).toBe(0);
  });

  // Test for localStorage integration
  it('loads cart from localStorage on initialization', () => {
    // Prepare localStorage with a cart
    const cartItems = [{ beer: mockBeer, quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(cartItems));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items').textContent).toBe('2');
    expect(screen.getByTestId('total-price').textContent).toBe('20000');
    expect(screen.getByTestId('items-list').children.length).toBe(1);
    expect(screen.getByTestId('items-list').textContent).toContain('Test Beer - 2');
  });
}); 