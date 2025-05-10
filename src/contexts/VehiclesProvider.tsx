import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../services/axios";
import { VehiclesContext } from "./VehiclesContext";
import { useState } from "react";

export interface Vehicle {
  id: string;
  plate: string;
  fleet: string | null;
  type: 'vehicle' | 'implement';
  model: string;
  nameOwner: string;
  status: 'active';
}

type FetchVehiclesResponse = {
  statusCode: number;
  message: string;
  content: {
    vehicles: Vehicle[];
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

  const vehicles = data?.pages.flatMap((page) => page.content.vehicles) || [];

  const value = {
    vehicles,
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