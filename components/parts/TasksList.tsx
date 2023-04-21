import { Dispatch, SetStateAction } from 'react';
import TaskDueCard from './TaskDueCard';
import TaskCard from './TaskCard';
import dayjs from 'dayjs';
import { ITask } from '../../interfaces/ITask';

interface TasksProps {
   openModal: () => void;
   setModalContent: Dispatch<SetStateAction<ITask | null>>;
   tasks: ITask[] | [];
   status: String;
   classNameProp?: string;
}

function TasksList({
   tasks,
   setModalContent,
   openModal,
   status,
   classNameProp
}: TasksProps) {
   let filteredTasks;

   if (status === 'ativas') {
      filteredTasks = tasks.filter((task) => task.status !== 'concluida');
   } else {
      filteredTasks = tasks.filter((task) => task.status === status);
   }

   const tasksWithTime = filteredTasks.map((item: ITask) => {
      let diffToNow = dayjs(item?.dueDate).diff(dayjs(), 'day');
      item.leftTime = Number(diffToNow > 0 ? diffToNow : 0);
      return item;
   });

   const orderedTasks =
      status === 'ativas'
         ? tasksWithTime.sort((a: any, b: any) => a.leftTime - b.leftTime)
         : filteredTasks.sort(
              (a: any, b: any) =>
                 Number(new Date(b.dueAt)) - Number(new Date(a.dueAt))
           );

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
