'use client';
import React from 'react';

type RadioButtonProps = {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ name, value, checked, label, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio text-blue-600 focus:ring-blue-500"
      />
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
};

export default RadioButton;
