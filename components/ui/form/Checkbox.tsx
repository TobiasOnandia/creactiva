import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  label: React.ReactNode; 
  id: string;
}

export const Checkbox = ({ checked,  label, id }: CheckboxProps) => {
  return (
    <label htmlFor={id} className="text-neutral-400 text-sm flex gap-2 cursor-pointer">
      <button
        id={id}
        type="button"
        className={`flex items-center justify-center h-5 w-5 rounded border ${
          checked
            ? 'bg-cyan-500 border-cyan-500'
            : 'bg-neutral-800/50 border-white/10'
        } transition-colors mt-0.5 flex-shrink-0`}
      >
        {checked && <Check className="h-3.5 w-3.5 text-white" />}
      </button>
      <span>{label}</span>
    </label>
  );
};