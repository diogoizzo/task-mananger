import { ReactNode } from 'react';

interface ParagrafoProps {
   children: ReactNode;
   className?: string;
}

export default function Paragrafo({ children, className }: ParagrafoProps) {
   return (
      <p className={`font-medium text-indigo-90 ${className}`}>{children}</p>
   );
}
