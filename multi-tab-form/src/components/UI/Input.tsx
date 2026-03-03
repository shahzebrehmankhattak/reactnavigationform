import { useEffect, useState } from 'react';
import { validateField } from '../../utils/validation';
import type { InputProps } from '../../types/input.types';

export const Input = ({ label, value, onChange, required, pattern }: InputProps) => {
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if ((required && !value) || (value && pattern && !validateField(pattern, value))) {
      setError(true);
    } else {
      setError(false);
    }
  }, [value, pattern, required]);

  let borderClass = 'border-gray-300';

  if (touched) {
    if (error) {
      borderClass = 'border-red-500 focus:ring-red-500';
    } else {
      borderClass = 'border-blue-500 focus:ring-blue-500';
    }
  }

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="font-medium text-[#373737]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        className={`border p-2 rounded-lg outline-none transition-colors focus:ring-2 ${borderClass}`}
        value={value || ''}
        placeholder={`Enter ${label.toLowerCase()}...`}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onBlur={() => setTouched(true)}
      />
      {(error && touched) && (
        <span className="text-red-500 text-sm mt-1">
          {required && !value
            ? `${label} is required`
            : `Invalid ${label.toLowerCase()}`}
        </span>
      )}
    </div>
  );
};