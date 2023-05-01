import dayjs from 'dayjs';

import { ITask } from '../../interfaces/ITask';
import { useProjectContext } from '../../context/GlobalContext';

type TaskDueCardProps = {
   task: ITask;
};

function TaskDueCard({ task }: TaskDueCardProps) {
   const projects = useProjectContext();
   const rightProject = projects.find(
      (project) => project.id === task.projetoId
   );

   return (
      <div className="bg-gray-50 relative  overflow-hidden flex  w-full shadow-md rounded-md mt-8 ">
         <div className="w-2/3 relative">
            <div className="flex flex-col relative ">
               <h2 className="font-semibold text-2xl text-indigo-900 px-5 pt-5">
                  {task.title}
               </h2>
               <p className="ml-5 px-3 font-semibold mt-2 tracking-wider shadow-sm shadow-indigo-900/50 text-xs bg-indigo-800 w-fit p-1  rounded-full text-indigo-100 ">
                  {rightProject?.title
                     ? rightProject.title
                     : 'Essas tarefa não pertencia a nenhum projeto'}
               </p>
               <p className="px-5 pt-6 text-sm text-indigo-800 text-justify">
                  {task.description}
               </p>
               <div className="flex mt-6 justify-between text-indigo-800 text-sm bg-indigo-50 px-40 py-5 ">
                  <p>Criada em: {dayjs(task.createdAt).format('DD/MM/YYYY')}</p>
                  <p>
                     Iniciada em: {dayjs(task.startDate).format('DD/MM/YYYY')}
                  </p>
               </div>
            </div>
         </div>
         <div className="w-1/3 relative bg-indigo-100 flex flex-col">
            <div className="w-full text-center py-3 text-indigo-100 font-semibold bg-indigo-900">
               Tarefa concluída em:
            </div>
            <div className="flex h-full w-full justify-center items-center text-indigo-900 font-bold text-2xl ">
               {dayjs(task.dueAt).format('DD/MM/YYYY')}
            </div>
         </div>
      </div>
   );
}
export default TaskDueCard;
