interface TableHeadProps {
   heads: string[];
}

export default function TableHead({ heads }: TableHeadProps) {
   return (
      <thead>
         <tr className="bg-indigo-200 text-indigo-900 uppercase text-sm leading-normal">
            {heads.map((head, idx, arr) => {
               if (idx === arr?.length - 1) {
                  return (
                     <th className="py-3 px-6 text-right" key={head}>
                        {head}
                     </th>
                  );
               } else if (idx === 0) {
                  return (
                     <th className="py-3 px-6 text-left" key={head}>
                        {head}
                     </th>
                  );
               } else {
                  return (
                     <th className="py-3 px-6 text-justify" key={head}>
                        {head}
                     </th>
                  );
               }
            })}
         </tr>
      </thead>
   );
}
