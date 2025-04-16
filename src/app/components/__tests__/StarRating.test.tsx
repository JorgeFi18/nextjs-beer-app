import { render, screen } from '@testing-library/react';
import StarRating from '../StarRating';

describe('StarRating', () => {
  it('renders the correct number of filled stars', () => {
    render(<StarRating rating={3} />);
    
    const svg = document.querySelectorAll('svg');
    expect(svg.length).toBe(5);
    
    // First 3 SVGs should have text-rose-400 class (default color)
    expect(svg[0]).toHaveClass('text-rose-400');
    expect(svg[1]).toHaveClass('text-rose-400');
    expect(svg[2]).toHaveClass('text-rose-400');
    
    // Last 2 SVGs should have text-gray-300 class
    expect(svg[3]).toHaveClass('text-gray-300');
    expect(svg[4]).toHaveClass('text-gray-300');
  });

  it('renders a half star for decimal values', () => {
    render(<StarRating rating={3.7} />); // Should round to 3.5
    
    const svg = document.querySelectorAll('svg');
    expect(svg.length).toBe(5);
    
    // First 3 SVGs should be filled
    expect(svg[0]).toHaveClass('text-rose-400');
    expect(svg[1]).toHaveClass('text-rose-400');
    expect(svg[2]).toHaveClass('text-rose-400');
    
    // 4th SVG should have a linearGradient for the half star
    expect(svg[3].innerHTML).toContain('linearGradient');
    
    // 5th SVG should be empty
    expect(svg[4]).toHaveClass('text-gray-300');
  });

  it('displays the rating value when showValue is true', () => {
    render(<StarRating rating={4.2} showValue={true} />);
    
    // Rating value should be rounded to nearest 0.5 (4.0)
    expect(screen.getByText('4.0')).toBeInTheDocument();
  });

  it('does not display the rating value when showValue is false', () => {
    render(<StarRating rating={4.2} showValue={false} />);
    
    // No text node with rating value should be present
    expect(screen.queryByText('4.0')).not.toBeInTheDocument();
    expect(screen.queryByText('4.2')).not.toBeInTheDocument();
  });

  it('applies the correct size class', () => {
    const { container, rerender } = render(<StarRating rating={3} size="sm" />);
    
    let svg = container.querySelectorAll('svg');
    expect(svg[0]).toHaveClass('w-3');
    expect(svg[0]).toHaveClass('h-3');
    
    // Test medium size (default)
    rerender(<StarRating rating={3} />);
    svg = container.querySelectorAll('svg');
    expect(svg[0]).toHaveClass('w-4');
    expect(svg[0]).toHaveClass('h-4');
    
    // Test large size
    rerender(<StarRating rating={3} size="lg" />);
    svg = container.querySelectorAll('svg');
    expect(svg[0]).toHaveClass('w-6');
    expect(svg[0]).toHaveClass('h-6');
  });

  it('applies the correct color class', () => {
    const { container, rerender } = render(<StarRating rating={3} color="red" />);
    
    let svg = container.querySelectorAll('svg');
    expect(svg[0]).toHaveClass('text-red-500');
    
    // Test rose color (default)
    rerender(<StarRating rating={3} />);
    svg = container.querySelectorAll('svg');
    expect(svg[0]).toHaveClass('text-rose-400');
    
    // Test other colors
    rerender(<StarRating rating={3} color="yellow" />);
    svg = container.querySelectorAll('svg');
    expect(svg[0]).toHaveClass('text-yellow-400');
    
    rerender(<StarRating rating={3} color="blue" />);
    svg = container.querySelectorAll('svg');
    expect(svg[0]).toHaveClass('text-blue-500');
    
    rerender(<StarRating rating={3} color="orange" />);
    svg = container.querySelectorAll('svg');
    expect(svg[0]).toHaveClass('text-orange-500');
  });
}); 