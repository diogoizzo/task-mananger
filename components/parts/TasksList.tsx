import { Dispatch, SetStateAction } from 'react';
import TaskDueCard from './TaskDueCard';
import TaskCard from './TaskCard';
import { ITask } from '../../interfaces/ITask';
import TasksCache from '../../cache/TasksCache';
import ITaskFrom from '../../interfaces/ITaskForm';
import filterAndOrderTask from '../../utils/filterAndOrderTask';

interface TasksProps {
   openModal: () => void;
   setModalContent: Dispatch<SetStateAction<ITaskFrom | null>>;
   tasksCache?: TasksCache;
   status: string;
   classNameProp?: string;
   tasks?: ITask[];
}

function TasksList({
   tasksCache,
   setModalContent,
   openModal,
   status,
   classNameProp,
   tasks
}: TasksProps) {
   let orderedTasks: ITask[];
   if (tasks) {
      orderedTasks = filterAndOrderTask(tasks, status);
   } else {
      orderedTasks = tasksCache?.orderByStatus(status) || [];
   }

   return (
      <section>
         <div className=" flex relative items-center justify-center  font-sans overflow-y-auto">
            <div className="w-full px-8 pb-8">
               {orderedTasks?.length > 0 ? (
                  status !== 'concluida' ? (
                     orderedTasks.map((task: ITask) => (
                        <TaskCard
                           key={task.id}
                           task={task}
                           openModal={openModal}
                           setModalContent={setModalContent}
                        />
                     ))
                  ) : (
                     orderedTasks.map((task: ITask) => (
                        <TaskDueCard key={task.id} task={task} />
                     ))
                  )
               ) : (
                  <div
                     className={
                        classNameProp ? classNameProp : 'mt-40 text-indigo-900'
                     }
                  >
                     <h3 className=" font-semibold text-lg text-center">
                        Nenhuma tarefa encontrada
                     </h3>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}
export default TasksList;
