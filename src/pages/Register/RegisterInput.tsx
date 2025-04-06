interface Props {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  }
  
  const RegisterInput = ({ type, value, onChange, placeholder }: Props) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border-2 border-gray-300 rounded-md"
    />
  );
  
  export default RegisterInput;
  