import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: React.ReactNode; 
  id: string;
}

export const Checkbox = ({  label, id }: CheckboxProps) => {
  return (
    <label htmlFor={id} className="text-neutral-400  relative text-sm flex gap-2 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className={`flex items-center peer justify-center h-5 w-5 rounded border appearance-none
          checked:bg-cyan-500 checked:border-cyan-500
          bg-neutral-800/50 border-white/10
         transition-colors mt-0.5 flex-shrink-0`}
      />
      <Check className="absolute top-1 hidden peer-checked:block left-0.5 h-4 w-4 text-white" />
      <span>{label}</span>
    </label>
  );
};