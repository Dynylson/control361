export function FleetMap() {
    return (
        <section className="bg-[#001622] rounded-2xl mt-6 border-[2px] border-[#002D44]">
            <h2 className="font-semibold ml-5 pt-4">Mapa rastreador</h2>
            <div className="p-4">
                {/* TODO: imagem apenas para estilização, modificar posteriormente para o mapa do google maps */}
                <img src="./src/assets/map.png" alt="Mapa rastreador" className="w-full h-[518px]" />
            </div>
        </section>
    )
}