import { Dispatch, SetStateAction } from 'react';
import TaskDueCard from './TaskDueCard';
import TaskCard from './TaskCard';
import dayjs from 'dayjs';
import { ITask } from '../../interfaces/ITask';

interface TasksProps {
   openModal: () => void;
   setModalContent: Dispatch<SetStateAction<ITask | null>>;
   tasks: ITask[] | [];
   status: string;
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
   } else if (status === 'atrasadas') {
      filteredTasks = tasks.filter(
         (task) =>
            dayjs(task?.dueDate).diff(dayjs(), 'day') < 0 &&
            task.status !== 'concluida'
      );
   } else {
      filteredTasks = tasks.filter((task) => task.status === status);
   }

   const tasksWithTime = filteredTasks.map((item: ITask) => {
      item.leftTime = dayjs(item?.dueDate).diff(dayjs(), 'day');
      return item;
   });

   const orderedTasks =
      status === 'ativas' || status === 'proximasAcoes'
         ? tasksWithTime.sort(
              (a: any, b: any) => Number(a.leftTime) - Number(b.leftTime)
           )
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
