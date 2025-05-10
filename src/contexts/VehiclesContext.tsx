import { createContext } from "react";
import type { Vehicle } from "./VehiclesProvider";

interface VehiclesContextType {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  vehicleType: string;
  setVehicleType: (type: string) => void;
}

const defaultContextValue: VehiclesContextType = {
  vehicles: [],
  isLoading: false,
  error: null,
  fetchNextPage: () => {},
  hasNextPage: false,
  isFetchingNextPage: false,
  vehicleType: 'tracked',
  setVehicleType: () => {}
};

export const VehiclesContext = createContext<VehiclesContextType>(defaultContextValue);