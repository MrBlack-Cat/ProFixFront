// src/components/ServiceProvider/SettingsTab/SettingsInputField.tsx
import React from 'react';

interface Props {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
}

const SettingsInputField = ({ label, name, value, onChange, type = 'text' }: Props) => {
  const safeValue =
    type === 'number'
      ? value === null || value === undefined || isNaN(Number(value))
        ? ''
        : value
      : value ?? '';

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={safeValue ?? ''}
        onChange={onChange}
        type={type}
        className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default SettingsInputField;
