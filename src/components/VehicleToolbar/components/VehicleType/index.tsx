import { CustomRadioGroup } from '../CustomRadioButton';
import { useVehicles } from '../../../../hooks/useVehicles';

export function VehicleType() {
  const { vehicleType, setVehicleType } = useVehicles();

  const options = [
    { value: 'tracked', label: 'Rastreados' },
    { value: 'others', label: 'Outros' },
  ];

  return (
    <div>
      <CustomRadioGroup 
        options={options} 
        value={vehicleType} 
        onChange={setVehicleType} 
        name="vehicleTypes"
      />
    </div>
  );
}