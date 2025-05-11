import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useVehicles } from '../../hooks/useVehicles';
import type { Vehicle } from '../../contexts/VehiclesProvider';

const vehicleIcons = {
  moving: new L.Icon({
    iconUrl: './src/assets/truck-active.svg',
    iconSize: [60, 60],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'moving-vehicle-icon'
  }),
  stopped: new L.Icon({
    iconUrl: './src/assets/truck-inactive.svg',
    iconSize: [60, 60],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'stopped-vehicle-icon'
  })
};

type VehicleWithLocation = Vehicle & {
  location: {
    lat: number;
    lng: number;
    ignition: 'Ligado' | 'Desligado';
    updatedAt: string;
  };
};

export function FleetMap() {
  const { vehicles, isLoading } = useVehicles();

  const vehiclesWithLocation = vehicles.filter(
    (vehicle): vehicle is VehicleWithLocation => !!vehicle.location
  );

  const mapStyle = {
    height: '480px',
    width: '100%',
    borderRadius: '0.5rem',
    border: '1px solid #002D44'
  };

  const getCenterPosition = (): LatLngExpression => {
    if (vehiclesWithLocation.length > 0) {
      const firstVehicle = vehiclesWithLocation[0];
      return {
        lat: firstVehicle.location.lat,
        lng: firstVehicle.location.lng
      };
    }
    return [-23.3231208, -46.7537495];
  };

  if (isLoading) {
    return (
      <section className="bg-[#001622] rounded-2xl mt-6 border-[2px] border-[#002D44]">
        <h2 className="font-semibold ml-5 pt-4">Mapa rastreador</h2>
        <div className="p-4 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0095E4]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#001622] rounded-2xl mt-6 border-[2px] border-[#002D44]">
      <h2 className="font-semibold ml-5 pt-4">Mapa rastreador</h2>
      <div className="p-4">
        <MapContainer 
          center={getCenterPosition()} 
          zoom={13}
          style={mapStyle}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {vehiclesWithLocation.map(vehicle => {
            const isMoving = vehicle.location.ignition === 'Ligado';
            const lastUpdate = new Date(vehicle.location.updatedAt);
            
            return (
              <Marker 
                key={`${vehicle.id}-${vehicle.location.updatedAt}`}
                position={[vehicle.location.lat, vehicle.location.lng]}
                icon={isMoving ? vehicleIcons.moving : vehicleIcons.stopped}
              >
                <Popup className="bg-[#001622] border-[#002D44] text-white">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{vehicle.plate}</h3>
                    <p><span className="font-semibold">Modelo:</span> {vehicle.model}</p>
                    <p><span className="font-semibold">Frota:</span> {vehicle.fleet || 'N/A'}</p>
                    <p className={isMoving ? 'text-green-400' : 'text-yellow-400'}>
                      {isMoving ? '● Motor Ligado' : '● Motor Desligado'}
                    </p>
                    <p>
                      <span className="font-semibold">Última atualização:</span>{' '}
                      {lastUpdate.toLocaleDateString('pt-BR')} {lastUpdate.toLocaleTimeString('pt-BR')}
                    </p>
                    <a
                      className="w-full text-center border-b-2"
                      href={`https://www.google.com/maps?q=${vehicle.location.lat},${vehicle.location.lng}`}
                      target="_blank"
                    >
                      {vehicle.location.lat}, {vehicle.location.lng}
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {!isLoading && vehiclesWithLocation.length === 0 && (
          <div className="text-center text-white py-8">
            Nenhum veículo com dados de localização disponível
          </div>
        )}
      </div>
    </section>
  );
}
