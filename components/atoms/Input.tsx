import { ChangeEventHandler } from 'react';

interface inputProps {
   titulo: string;
   type?: string;
   placeholder?: string;
   spanClass?: string;
   inputCalss?: string;
   className?: string;
   value: string;
   onChange: ChangeEventHandler<HTMLInputElement>;
}

function Input({
   titulo,
   type,
   placeholder,
   spanClass,
   inputCalss,
   className,
   value,
   onChange
}: inputProps) {
   return (
      <div
         className={`relative w-full mt-3 h-12 py-4 px-3 border border-indigo-600 hover:border-indigo-300 focus-within:border-black rounded-lg ${className}`}
      >
         <span
            className={`absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-md font-semibold text-indigo-900 px-1 bg-indigo-50 ${spanClass}}`}
         >
            {titulo}
         </span>
         <input
            className={`block w-full outline-none bg-transparent text-gray-600 placeholder-gray-600 font-semibold ${inputCalss}`}
            type={type || 'text'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />
      </div>
   );
}
export default Input;
