import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomRadioGroup } from '../../components/VehicleToolbar/components/CustomRadioButton';

describe('CustomRadioGroup', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];
  
  const mockOnChange = vi.fn();
  const mockName = 'test-radio-group';

  it('should render all provided options', () => {
    render(
      <CustomRadioGroup
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
        name={mockName}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    
    const radioInputs = screen.getAllByRole('radio', { hidden: true });
    expect(radioInputs).toHaveLength(3);
  });

  it('should mark the correct option based on current value', () => {
    render(
      <CustomRadioGroup
        options={mockOptions}
        value="option2"
        onChange={mockOnChange}
        name={mockName}
      />
    );

    const radioInputs = screen.getAllByRole('radio', { hidden: true });
    expect(radioInputs[0]).not.toBeChecked();
    expect(radioInputs[1]).toBeChecked();
    expect(radioInputs[2]).not.toBeChecked();
    
    const labels = screen.getAllByText(/Option \d/);
    
    const selectedLabel = labels[1].closest('label');
    expect(selectedLabel).toBeInTheDocument();
    
    if (selectedLabel) {
      const indicator = selectedLabel.querySelector('.bg-\\[\\#0095E4\\]');
      expect(indicator).toBeInTheDocument();
    }
  });

  it('should call the onChange function with the correct value when an option is clicked', () => {
    render(
      <CustomRadioGroup
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
        name={mockName}
      />
    );

    const option2Text = screen.getByText('Option 2');
    fireEvent.click(option2Text);
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('option2');
    
    const option3Text = screen.getByText('Option 3');
    fireEvent.click(option3Text);
    
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith('option3');
  });

  it('should use the provided name for the radio inputs', () => {
    const customName = 'custom-radio-name';
    
    render(
      <CustomRadioGroup
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
        name={customName}
      />
    );

    const radioInputs = screen.getAllByRole('radio', { hidden: true });
    radioInputs.forEach(input => {
      expect(input).toHaveAttribute('name', customName);
    });
  });

  it('should render correctly with zero options', () => {
    const { container } = render(
      <CustomRadioGroup
        options={[]}
        value=""
        onChange={mockOnChange}
        name={mockName}
      />
    );
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv.children.length).toBe(0);
  });

  it('should render correctly with a single option', () => {
    const singleOption = [{ label: 'Single Option', value: 'single' }];
    
    const { container } = render(
      <CustomRadioGroup
        options={singleOption}
        value="single"
        onChange={mockOnChange}
        name={mockName}
      />
    );
    
    expect(screen.getByText('Single Option')).toBeInTheDocument();
    
    const radioInput = screen.getByRole('radio', { hidden: true });
    expect(radioInput).toBeChecked();
    
    const indicator = container.querySelector('.bg-\\[\\#0095E4\\]');
    expect(indicator).toBeInTheDocument();
  });
});
