interface Props {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const ServiceInputField = ({ label, name, type = 'text', value, onChange }: Props) => (
    <div>
      <label className="text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded mt-1"
      />
    </div>
  );
  
  export default ServiceInputField;
  