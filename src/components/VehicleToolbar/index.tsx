import { VehicleType } from "./components/VehicleType";

export function VehicleToolbar() {
    return (
        <section className="flex justify-between items-center border-b-2 border-[#002D44] pb-5">
            <div className="flex items-center gap-36">
                <h2 className="text-[1.25rem] font-semibold">Lista</h2>
                <VehicleType />
            </div>
            <div className="flex items-center gap-4">
                <input
                type="text" 
                placeholder="Buscar por placa ou frota" 
                className="
                    border-2 border-[#89919B] rounded-lg p-3 focus:outline-none 
                    focus:border-[#0095E4] focus:ring-[1px] focus:ring-[#0095E4]
                    w-[280px] h-[40px] text-[#8A939D] placeholder-[#8A939D]"
                />
                <button className="
                    bg-[#0095E4] w-[150px] h-[40px] rounded-lg cursor-pointer 
                    transition duration-200 hover:brightness-110"
                >
                    Novo
                </button>
            </div>
        </section>
    )
}