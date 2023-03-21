import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import TaskDueCard from '../parts/TaskDueCard';
import TaskCard from '../parts/TaskCard';
import dayjs from 'dayjs';
import { ITask } from '../../interfaces/ITask';

interface Task extends ITask {
   leftTime?: number;
}

interface TasksProps {
   openModal: () => void;
   setModalContent: Dispatch<SetStateAction<ITask | null>>;
   tasks: Task[];
   status: String;
}

function TasksList({ tasks, setModalContent, openModal, status }: TasksProps) {
   let filteredTasks;

   if (status === 'ativas') {
      filteredTasks = tasks.filter((task) => task.status !== 'concluida');
   } else {
      filteredTasks = tasks.filter((task) => task.status === status);
   }

   const tasksWithTime = filteredTasks.map((item: Task) => {
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
         <div className=" flex h-full items-center justify-center  font-sans overflow-y-auto">
            <div className="w-full px-8 pb-8">
               {status !== 'concluida'
                  ? orderedTasks.map((task: Task) => (
                       <TaskCard
                          key={task.id}
                          task={task}
                          openModal={openModal}
                          setModalContent={setModalContent}
                       />
                    ))
                  : orderedTasks.map((task: Task) => (
                       <TaskDueCard key={task.id} task={task} />
                    ))}
            </div>
         </div>
      </section>
   );
}
export default TasksList;
