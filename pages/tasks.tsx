import { useEffect, useState } from 'react';
import BtnAdd from '../components/atoms/BtnAdd';
import PageTitle from '../components/atoms/PageTitle';
import Paragrafo from '../components/atoms/Paragrafo';
import TasksModal from '../components/modals/TasksModal';
import Menu from '../components/parts/Menu';
import TasksList from '../components/sections/TasksList';
import { useTasksContext, useTasksDispatch } from '../context/GlobalContext';
import axios from 'axios';
import { TasksActionsTypes } from '../reducer/tasksReducer';
import { ITask } from '../interfaces/ITask';

function Tasks() {
   const [isOpen, setOpen] = useState(false);
   const [modalContent, setModalContent] = useState<ITask | null>(null);
   const tasks = useTasksContext();
   const dispatch = useTasksDispatch();

   function closeModal() {
      setModalContent(null);
      setOpen(false);
   }

   function openModal() {
      setOpen(true);
   }

   useEffect(() => {
      const controller = new AbortController();
      if (!tasks.length) {
         axios
            .get('/api/tasks', { signal: controller.signal })
            .then((res) => {
               dispatch({
                  type: TasksActionsTypes.addTask,
                  payload: res.data
               });
            })
            .catch((error) => {
               console.log(error);
            });
         return () => {
            controller.abort();
         };
      }
   }, [dispatch, tasks]);
   return (
      <Menu>
         <TasksModal
            isOpen={isOpen}
            closeModal={closeModal}
            modalContent={modalContent}
            setModalContent={setModalContent}
         />
         <section className="bg-white p-8 text-indigo-900 sticky top-0 z-30 shadow-md ">
            <div className="flex flex-wrap items-center -m-2">
               <div className="w-full md:w-1/2 p-2">
                  <PageTitle title="Tarefas" />
                  <Paragrafo>Veja aqui todas as suas tarefas</Paragrafo>
               </div>
               <div className="w-full md:w-1/2 p-2">
                  <div className="flex flex-wrap justify-end -m-2">
                     <div className="w-full md:w-auto p-2">
                        <BtnAdd onClick={openModal} />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <TasksList
            tasks={tasks}
            openModal={openModal}
            setModalContent={setModalContent}
         />
      </Menu>
   );
}
export default Tasks;
