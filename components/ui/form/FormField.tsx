import React from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';

interface FormFieldProps {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  icon?: 'mail' | 'eye'; 
  showPassword?: boolean; 
  onTogglePasswordVisibility?: () => void; 
  helperText?: string | React.ReactNode;
  id: string;
}

export const FormField = ({
  label,
  type = 'text',
  placeholder,
  icon,
  showPassword,
  onTogglePasswordVisibility,
  id,
}: FormFieldProps) => {
  const isPasswordType = type === 'password';

  return (
    <label htmlFor={id} className="text-sm relative font-medium text-neutral-300 mb-2 block">
      {label}
      <input
        id={id}
        type={isPasswordType && showPassword ? "text" : type}
        className="w-full bg-neutral-800/50 border border-white/10 rounded-xl px-4 py-3.5 text-neutral-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 mt-2 focus:ring-cyan-500/20 transition-all"
        placeholder={placeholder}
      />
      {icon === 'mail' && (
        <span className="absolute inset-y-0 top-7 right-0 flex items-center pr-4">
          <Mail className='text-neutral-400 h-5 w-5' />
        </span>
      )}
      {isPasswordType && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex top-7 items-center pr-4"
          onClick={onTogglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-neutral-400" />
          ) : (
            <Eye className="h-5 w-5 text-neutral-400" />
          )}
        </button>
      )}
    </label>
  );
};