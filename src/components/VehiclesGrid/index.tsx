import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../services/axios";
import { useInView } from "react-intersection-observer";

const PER_PAGE = 20;

interface Vehicle {
    id: string;
    plate: string;
    fleet: string | null;
    type: string;
    model: string;
    nameOwner: string;
    status: string;
}

export type FetchVehiclesResponse = {
    statusCode: number;
    message: string;
    content: {
        vehicles: Vehicle[];
        totalPages: number;
        page: number;
        perPage: number;
    };
};

export function VehiclesGrid() {
    const fetchVehicles = async ({
        pageParam = 1,
    }: {
        pageParam?: number;
    }): Promise<FetchVehiclesResponse> => {
        const { data } = await api.get("/recruitment/vehicles/list-with-paginate", {
        params: {
            type: 'tracked',
            page: pageParam,
            perPage: PER_PAGE,
        },
        });
        return data;
    };

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["vehicles"],
        queryFn: fetchVehicles,
        initialPageParam: 1,
        getNextPageParam: (lastPage: FetchVehiclesResponse) => {
        const { page, totalPages } = lastPage.content;
        return page < totalPages ? page + 1 : undefined;
        },
    });

    const { ref } = useInView({
        threshold: 0.1,
        triggerOnce: false,
        onChange: (inView) => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        },
    });

    const vehicles = data?.pages.flatMap((page) => page.content.vehicles) || [];

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
                    <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{vehicle.type}</td>
                    <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{vehicle.model}</td>
                    <td className="w-1/5 px-4 py-4">{vehicle.status}</td>
                </tr>
                ))}
            </tbody>
            </table>
            
            {isFetchingNextPage && (
            <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#002D44]"></div>
            </div>
            )}
            
            <div ref={ref} className="h-2"></div>
        </div>
        </div>
    );
}