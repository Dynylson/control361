import { VehicleType } from "./components/VehicleType";

export function VehicleToolbar() {
    return (
        <section className="flex justify-between items-center">
            <div className="flex items-center gap-36">
                <h2 className="text-[1.25rem] font-semibold">Lista</h2>
                <VehicleType />
            </div>
            <div className="flex items-center gap-4">
                <input
                type="text" 
                placeholder="Buscar por placa ou frota" 
                className="
                    border-1 border-[#89919B] rounded-md p-2 focus:outline-none 
                    focus:border-[#0095E4] focus:ring-1 focus:ring-[#0095E4]
                    w-[280px] h-[40px]"
                />
                <button className="bg-[#0095E4] w-[150px] h-[40px] rounded-lg cursor-pointer">Novo</button>
            </div>
        </section>
    )
}