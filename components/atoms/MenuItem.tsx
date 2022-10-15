import Link from 'next/link';
import { useRouter } from 'next/router';

interface MenuProps {
   className?: string;
   title: string;
   svg: any;
   path: string;
}

export default function MenuItem({ className, title, svg, path }: MenuProps) {
   const router = useRouter();

   return (
      <li>
         <Link href={path}>
            <a
               className={`flex items-center pl-3 py-3 pr-4 text-gray-50  rounded ${
                  router.pathname === path
                     ? 'bg-indigo-500'
                     : 'hover:bg-gray-900'
               } ${className}}`}
            >
               <span className="inline-block mr-3">{svg}</span>
               <span>{title}</span>
            </a>
         </Link>
      </li>
   );
}
