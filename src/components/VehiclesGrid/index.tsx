export function VehiclesGrid() {
    const veiculosMock = [
        {
          placa: 'ABC-1234',
          frota: 'Frota 1',
          tipo: 'Caminhão',
          modelo: 'Volvo FH',
          status: 'Ativo',
        },
        {
          placa: 'XYZ-5678',
          frota: 'Frota 2',
          tipo: 'Van',
          modelo: 'Mercedes Sprinter',
          status: 'Manutenção',
        },
        {
          placa: 'DEF-9012',
          frota: 'Frota 3',
          tipo: 'Carro',
          modelo: 'Fiat Uno',
          status: 'Inativo',
        },
        {
            placa: 'DEF-9012',
            frota: 'Frota 3',
            tipo: 'Carro',
            modelo: 'Fiat Uno',
            status: 'Inativo',
        },
        {
            placa: 'DEF-9012',
            frota: 'Frota 3',
            tipo: 'Carro',
            modelo: 'Fiat Uno',
            status: 'Inativo',
        },
        {
            placa: 'DEF-9012',
            frota: 'Frota 3',
            tipo: 'Carro',
            modelo: 'Fiat Uno',
            status: 'Inativo',
        },
    ];

    return (
        <div className="mt-6 mb-3 overflow-hidden rounded-2xl border-2 border-[#002D44]">
          <table className="min-w-full table-fixed divide-y divide-[#002D44]">
            <thead>
              <tr className="bg-[#001622] text-center text-sm font-semibold text-white">
                <th className="w-1/5 px-4 py-6 border-r border-[#002D44]">Placa</th>
                <th className="w-1/5 px-4 py-6 border-r border-[#002D44]">Frota</th>
                <th className="w-1/5 px-4 py-6 border-r border-[#002D44]">Tipo</th>
                <th className="w-1/5 px-4 py-6 border-r border-[#002D44]">Modelo</th>
                <th className="w-1/5 px-4 py-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#002D44]">
              {veiculosMock.map((veiculo, index) => (
                <tr key={index} className="text-center text-[#C8C8C8]">
                  <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{veiculo.placa}</td>
                  <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{veiculo.frota}</td>
                  <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{veiculo.tipo}</td>
                  <td className="w-1/5 px-4 py-4 border-r border-[#002D44]">{veiculo.modelo}</td>
                  <td className="w-1/5 px-4 py-4">{veiculo.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}