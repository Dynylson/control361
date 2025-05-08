import { useState } from "react";
import { CustomRadioGroup } from "../CustomRadioButton";

export function VehicleType() {
    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = (value: string) => {
        setSelectedValue(value);
    };

    const options = [
        { value: 'tracked', label: 'Rastreados' },
        { value: 'others', label: 'Outros' },
    ];

    return (
        <div>
            <CustomRadioGroup 
                options={options} 
                value={selectedValue} 
                onChange={handleRadioChange} 
                name="vehicleTypes"
            />
        </div>
    );
}