import { render, screen, fireEvent } from '@testing-library/react';
import QuantitySelector from '../QuantitySelector';

describe('QuantitySelector', () => {
  it('renders with initial value', () => {
    render(<QuantitySelector initialValue={5} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('uses default initial value of 1 when not provided', () => {
    render(<QuantitySelector />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('increases quantity when plus button is clicked', () => {
    render(<QuantitySelector initialValue={1} />);
    
    // Get the + button and click it
    const plusButton = screen.getByText('+').closest('button');
    fireEvent.click(plusButton!);
    
    // Quantity should increase to 2
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('decreases quantity when minus button is clicked', () => {
    render(<QuantitySelector initialValue={5} />);
    
    // Get the - button and click it
    const minusButton = screen.getByText('-').closest('button');
    fireEvent.click(minusButton!);
    
    // Quantity should decrease to 4
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('does not decrease below 1', () => {
    render(<QuantitySelector initialValue={1} />);
    
    // Get the - button and click it
    const minusButton = screen.getByText('-').closest('button');
    fireEvent.click(minusButton!);
    
    // Quantity should still be 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls the onChange callback when quantity changes', () => {
    const handleChange = jest.fn();
    render(<QuantitySelector initialValue={1} onChange={handleChange} />);
    
    // The onChange should be called once when the component mounts
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(1);
    
    // Get the + button and click it
    const plusButton = screen.getByText('+').closest('button');
    fireEvent.click(plusButton!);
    
    // onChange should be called again with the new value
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('handles multiple clicks', () => {
    render(<QuantitySelector initialValue={1} />);
    
    // Get the buttons
    const plusButton = screen.getByText('+').closest('button');
    const minusButton = screen.getByText('-').closest('button');
    
    // Click plus multiple times
    fireEvent.click(plusButton!);
    fireEvent.click(plusButton!);
    fireEvent.click(plusButton!);
    
    // Quantity should be 4
    expect(screen.getByText('4')).toBeInTheDocument();
    
    // Click minus
    fireEvent.click(minusButton!);
    
    // Quantity should be 3
    expect(screen.getByText('3')).toBeInTheDocument();
  });
}); 