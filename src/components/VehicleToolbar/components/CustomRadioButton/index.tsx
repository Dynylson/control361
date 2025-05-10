type Option = {
    label: string;
    value: string;
};

interface CustomRadioGroupProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    name: string;
};

export function CustomRadioGroup({ options, value, onChange, name }: CustomRadioGroupProps) {
    return (
        <div className="flex items-center space-x-6">
        {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <span
                className={`w-4 h-4 rounded-full border-2 border-[#0095E4] flex items-center justify-center`}
            >
                {value === option.value && (
                <span className="w-2 h-2 rounded-full bg-[#0095E4]" />
                )}
            </span>
            <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="hidden"
            />
            <span className="text-white font-medium">{option.label}</span>
            </label>
        ))}
        </div>
    );
}