import axios from 'axios';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import {
   useProjectContext,
   useProjectDispatch,
   useTasksDispatch
} from '../../context/GlobalContext';
import { ITask } from '../../interfaces/ITask';
import { TasksActionsTypes } from '../../reducer/tasksReducer';
import mapStatus from '../../utils/mapStatus';
import { ProjectActionsTypes } from '../../reducer/projectReducer';
import rightProjectAndTaskIdx from '../../utils/rightProjectAndTaskIdx';

interface TaskCardProps {
   task: ITask;
   openModal: () => void;
   setModalContent: Dispatch<SetStateAction<ITask | null>>;
}

function TaskCard({ task, setModalContent, openModal }: TaskCardProps) {
   const projects = useProjectContext();
   const dispatch = useTasksDispatch();
   const projectDispatch = useProjectDispatch();
   const rightProject = projects.find(
      (project) => project.id === task.projetoId
   );
   const leftTime = task.leftTime || 0;

   function deleteTask() {
      axios.delete(`/api/tasks/${task.id}`).then((res) => {
         dispatch({ type: TasksActionsTypes.removeTask, payload: [res.data] });
         const [rigthProject, taskIdx] = rightProjectAndTaskIdx(projects, task);
         rigthProject.tarefas.splice(taskIdx, 1);
         projectDispatch({
            type: ProjectActionsTypes.updateProject,
            payload: [rigthProject]
         });
      });
   }

   function completeTask() {
      axios.patch(`/api/tasks/${task.id}`).then((res) => {
         dispatch({ type: TasksActionsTypes.updateTask, payload: [res.data] });
         const [rigthProject, taskIdx] = rightProjectAndTaskIdx(projects, task);
         if (rigthProject) {
            rigthProject.tarefas[taskIdx] = res.data;
            projectDispatch({
               type: ProjectActionsTypes.updateProject,
               payload: [rigthProject]
            });
         }
         res.data.isDependencyOf.forEach((dependentTask: ITask) => {
            const countActiveDependencies = dependentTask?.dependencies.reduce(
               (acc: number, taskDepedency: ITask) => {
                  return taskDepedency.status !== 'concluida' ? acc + 1 : acc;
               },
               0
            );
            if (countActiveDependencies === 0) {
               axios
                  .patch(`/api/tasks/${dependentTask.id}`, {
                     status: 'proximasAcoes'
                  })
                  .then((res) => {
                     dispatch({
                        type: TasksActionsTypes.updateTask,
                        payload: [res.data]
                     });
                     const [rigthProject, taskIdx] = rightProjectAndTaskIdx(
                        projects,
                        res.data
                     );
                     if (rigthProject) {
                        rigthProject.tarefas[taskIdx] = res.data;
                        projectDispatch({
                           type: ProjectActionsTypes.updateProject,
                           payload: [rigthProject]
                        });
                     }
                  });
            }
         });
      });
   }
   return (
      <div className="bg-gray-50 min-h-[195px] flex relative shadow-md rounded-md mt-8 ">
         <div className="w-2/3 p-5 flex flex-col justify-start">
            <div>
               <h2 className="font-semibold text-xl text-indigo-900">
                  {task.title}
               </h2>
               <p className="text-sm text-indigo-800 mt-1">
                  {rightProject?.title || 'Não pertence a nenhum projeto'}
               </p>
            </div>
            <div className="font-semibold mt-2 tracking-wide shadow-sm shadow-indigo-900/50 text-xs bg-indigo-800 w-fit p-1 px-5 uppercase rounded-full text-indigo-100">
               {mapStatus(task)}
            </div>
            <div className="border-t mt-4 border-indigo-100">
               <p className="text-sm text-indigo-800 mt-4  text-justify pb-9 ">
                  {task.description || 'Não há descrição para essa tarefa'}
               </p>
            </div>

            <div className="flex absolute bottom-5 item-center justify-start text-indigo-900 mt-5">
               <div
                  onClick={completeTask}
                  className="w-5 mr-2  transform fill-indigo-900 hover:fill-indigo-500 hover:scale-125 transition-transform"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
               </div>
               <div
                  onClick={() => {
                     setModalContent(task);
                     openModal();
                  }}
                  className="w-5 mr-2 transform hover:text-indigo-500 hover:scale-125 transition-transform"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                     />
                  </svg>
               </div>
               <div
                  onClick={deleteTask}
                  className="w-5 transform hover:text-indigo-500 hover:scale-125 transition-transform"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                     />
                  </svg>
               </div>
            </div>
         </div>
         <div className="w-1/3 relative h-auto flex flex-col  items-center justify-center bg-indigo-100 rounded-tr-md rounded-br-md">
            <div
               className={`${
                  leftTime >= 0 ? 'bg-indigo-200' : 'bg-red-200'
               } relative -top-5 h-32 w-32 flex flex-col justify-center items-center shadow-md shadow-indigo-900/20 rounded-full border-4 border-gray-100`}
            >
               {leftTime >= 0 ? (
                  <div className="text-center relative -top-1">
                     <p className="text-5xl font-bold leading-none text-indigo-900">
                        {task.leftTime}
                     </p>
                     <p className="text-center text-indigo-700 text-xs leading-none">
                        dias <br /> restantes
                     </p>
                  </div>
               ) : (
                  <div className="text-center relative -top-1">
                     <p className="text-5xl font-bold leading-none text-red-600">
                        {Math.abs(leftTime)}
                     </p>
                     <p className="text-center text-red-500 text-xs leading-none">
                        dias <br /> de atraso
                     </p>
                  </div>
               )}
            </div>
            <div className="mt-3 absolute bottom-0 py-2 w-full justify-self-end text-center font-semibold text-indigo-100 rounded-br-md bg-indigo-900">
               {`Prazo final em ${dayjs(task.dueDate).format('DD/MM/YYYY')}`}
            </div>
         </div>
      </div>
   );
}
export default TaskCard;
