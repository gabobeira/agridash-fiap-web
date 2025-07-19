import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('should render children content', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    
    expect(screen.getByText('Test content')).toBeDefined();
  });

  it('should render with title when provided', () => {
    render(
      <Card title="Test Title">
        <p>Card content</p>
      </Card>
    );
    
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Card content')).toBeDefined();
  });

  it('should apply custom className', () => {
    render(
      <Card className="custom-class">
        <p>Custom content</p>
      </Card>
    );
    
    const cardElement = screen.getByText('Custom content').parentElement?.parentElement;
    expect(cardElement?.className).toContain('custom-class');
    expect(cardElement?.className).toContain('bg-white');
    expect(cardElement?.className).toContain('rounded-xl');
    expect(cardElement?.className).toContain('shadow-lg');
  });
});