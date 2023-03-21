import dayjs from 'dayjs';

import { ITask } from '../../interfaces/ITask';

type TaskDueCardProps = {
   task: ITask;
};

function TaskDueCard({ task }: TaskDueCardProps) {
   return (
      <div className="bg-gray-50 min-h-[175px] flex relative shadow-md rounded-md mt-8 ">
         <div className="w-2/3 relative   flex flex-col">
            <div className="relative p-5">
               <h2 className="font-semibold text-xl text-indigo-900">
                  {task.title}
               </h2>
               <p className="text-xs text-indigo-900 ">Nome do projeto</p>
               <p className="text-sm text-indigo-800 mt-2">
                  {task.description}
               </p>
            </div>
            <div className="flex absolute w-full p-5 bottom-0 bg-indigo-50 ">
               <div className="flex w-1/2 justify-center text-sm text-indigo-800">
                  Criada em: <span className="ml-1">25/03/2023</span>
               </div>
               <div className="flex w-1/2 justify-center text-sm text-indigo-800 ">
                  Iniciada em: <span className="ml-1">25/03/2023</span>
               </div>
            </div>
         </div>
         <div className="w-1/3 relative h-auto flex flex-col  items-start  bg-indigo-100 rounded-tr-md ">
            <div className=" py-2 w-full  text-center font-semibold text-indigo-100 rounded-tr-md  bg-indigo-900">
               Tarefa concluída em
            </div>
            <div className="relative w-full h-full flex flex-col items-center justify-center text-indigo-900 font-bold text-2xl ">
               {dayjs(task.dueAt).format('DD/MM/YYYY')}
            </div>
         </div>
      </div>
   );
}
export default TaskDueCard;
