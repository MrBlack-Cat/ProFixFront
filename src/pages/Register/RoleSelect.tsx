interface Props {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  
  const RoleSelect = ({ value, onChange }: Props) => (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 border-2 border-gray-300 rounded-md"
    >
      <option value={2}>Client</option>
      <option value={3}>Service Provider</option>
    </select>
  );
  
  export default RoleSelect;
  