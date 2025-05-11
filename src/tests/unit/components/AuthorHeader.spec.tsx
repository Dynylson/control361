// AuthorHeader.spec.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthorHeader } from '../../../components/AuthorHeader';

describe('AuthorHeader Component', () => {
  it('should render the author name correctly', () => {
    const testName = 'Jane Doe';
    render(<AuthorHeader fullName={testName} />);
    
    expect(screen.getByText(testName)).toBeInTheDocument();
  });

  it('should apply the correct Tailwind classes to the header', () => {
    render(<AuthorHeader fullName="Test" />);
    const header = screen.getByRole('banner');
    
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('items-center');
    expect(header).toHaveClass('bg-[#001E2E]');
    expect(header).toHaveClass('h-[60px]');
  });

  it('should apply the correct Tailwind classes to the heading', () => {
    render(<AuthorHeader fullName="Test" />);
    const heading = screen.getByRole('heading');
    
    expect(heading).toHaveClass('text-white');
    expect(heading).toHaveClass('text-[1.125rem]');
    expect(heading).toHaveClass('font-medium');
    expect(heading).toHaveClass('ml-6');
  });

});