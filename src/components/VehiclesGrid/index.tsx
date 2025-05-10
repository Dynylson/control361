import { useInView } from "react-intersection-observer";
import { useVehicles } from "../../hooks/useVehicles";

const vehicleTypesMap = {
  vehicle: 'Veículo',
  implement: 'Implemento',
};

const vehicleStatusMap = {
  active: 'Ativo',
};

export function VehiclesGrid() {
  const {
    vehicles,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVehicles();

  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002D44]"></div>
    </div>
  );

  if (error) return <p className="text-white text-center py-4">Erro ao carregar veículos.</p>;

  return (
    <div className="mt-6 mb-3 rounded-2xl border-2 border-[#002D44] overflow-hidden">
      <div className="overflow-y-auto max-h-[600px]">
        <table className="min-w-full table-fixed divide-y divide-[#002D44]">
          <thead className="sticky top-0 bg-[#001622]">
            <tr className="text-center text-sm font-semibold text-white">
              <th className="w-1/5 px-4 py-6 border-r border-[#002D44]">Placa</th>
              <th className="w-1/5 px-4 py-6 border-r border-[#002D44]">Frota</th>
              <th className="w-1/5 px-4 py-6 border-r border-[#002D44]">Tipo</th>
              <th className="w-1/5 px-4 py-6 border-r border-[#002D44]">Modelo</th>
              <th className="w-1/5 px-4 py-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#002D44]">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="text-center text-[#C8C8C8] hover:bg-[#002D44]/10">
                <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{vehicle.plate}</td>
                <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{vehicle.fleet || '-'}</td>
                <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{vehicleTypesMap[vehicle.type]}</td>
                <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{vehicle.model}</td>
                <td className="w-1/5 px-4 py-4">{vehicleStatusMap[vehicle.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#002D44]"></div>
          </div>
        )}
        
        <div ref={ref}></div>
      </div>
    </div>
  );
}