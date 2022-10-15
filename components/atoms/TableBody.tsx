import { ReactNode } from 'react';
import TableRow from './TableRow';

interface ITaskInbox {
   id: string;
   title: string;
}

interface TableBodyProps {
   tasks: ITaskInbox[];
}

export default function TableBody({ tasks }: TableBodyProps) {
   return (
      <tbody className="text-indigo-900 text-sm font-light">
         {tasks.map((task) => (
            <TableRow task={task} key={task.id} />
         ))}
      </tbody>
   );
}
