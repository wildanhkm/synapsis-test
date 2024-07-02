'use client';
import React from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  name: string;
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
};

const Select: React.FC<SelectProps> = ({ name, options, value, onChange, label }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-black dark:text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className='text-black dark:text-white'>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
