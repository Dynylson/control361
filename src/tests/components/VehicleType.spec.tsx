import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VehiclesContext } from '../../contexts/VehiclesContext';
import { VehicleType } from '../../components/VehicleToolbar/components/VehicleType';

const mockSetVehicleType = vi.fn();

const mockContextValue = {
  vehicleType: 'tracked',
  setVehicleType: mockSetVehicleType,
  vehicles: [],
  isLoading: false,
  error: null,
  fetchNextPage: vi.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
};

describe('VehicleType', () => {
  it('renders radio buttons correctly', () => {
    render(
      <VehiclesContext.Provider value={mockContextValue}>
        <VehicleType />
      </VehiclesContext.Provider>
    );

    expect(screen.getByLabelText('Rastreados')).toBeChecked();
  });

  it('calls setVehicleType when an option is selected', () => {
    render(
      <VehiclesContext.Provider value={mockContextValue}>
        <VehicleType />
      </VehiclesContext.Provider>
    );

    fireEvent.click(screen.getByLabelText('Outros'));

    expect(mockSetVehicleType).toHaveBeenCalledWith('others');
  });
});
