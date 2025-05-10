import { useContext } from "react";
import { VehiclesContext } from "../contexts/VehiclesContext";

export function useVehicles() {
  return useContext(VehiclesContext);
}