'use client';
import React, { useState } from 'react';
import RadioButton from './Radio';

type RadioGroupProps = {
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(event);
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          label={option.label}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
