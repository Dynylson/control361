import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../services/axios";
import { VehiclesContext } from "./VehiclesContext";
import { useState } from "react";

interface VehicleLocation {
  lat: number;
  lng: number;
  ignition: 'Ligado' | 'Desligado';
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  fleet: string | null;
  type: 'vehicle' | 'implement';
  model: string;
  nameOwner: string;
  status: 'active';
  location?: VehicleLocation
}

interface LocationVehicle {
  id: string;
  fleet: string;
  equipmentId: string;
  name: string;
  plate: string;
  ignition: 'Ligado' | 'Desligado';
  lat: number;
  lng: number;
  createdAt: string;
}

type FetchVehiclesResponse = {
  statusCode: number;
  message: string;
  content: {
    vehicles: Vehicle[];
    locationVehicles: LocationVehicle[];
    totalPages: number;
    page: number;
    perPage: number;
  };
};

const PER_PAGE = 20;

export function VehiclesProvider({ children }: { children: React.ReactNode }) {
  const [vehicleType, setVehicleType] = useState<string>('tracked');

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["vehicles", vehicleType],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get("/recruitment/vehicles/list-with-paginate", {
        params: {
          type: vehicleType,
          page: pageParam,
          perPage: PER_PAGE,
        },
      });
      return data as FetchVehiclesResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: FetchVehiclesResponse) => {
      const { page, totalPages } = lastPage.content;
      return page < totalPages ? page + 1 : undefined;
    },
  });

  const vehiclesWithLocation = data?.pages.flatMap(page => {
  return page.content.vehicles.map(vehicle => {
    const latestLocation = page.content.locationVehicles
      ?.filter(loc => loc.plate === vehicle.plate)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    
    return {
      ...vehicle,
      location: latestLocation ? {
        lat: latestLocation.lat,
        lng: latestLocation.lng,
        ignition: latestLocation.ignition,
        updatedAt: latestLocation.createdAt
      } : undefined
    } as Vehicle;
  });
}) || [];

  const value = {
    vehicles: vehiclesWithLocation,
    isLoading,
    error: error as Error | null,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    vehicleType,
    setVehicleType,
  };

  return (
    <VehiclesContext.Provider value={value}>
      {children}
    </VehiclesContext.Provider>
  );
}