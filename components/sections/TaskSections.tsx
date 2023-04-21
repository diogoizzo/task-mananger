import { useEffect, useState } from 'react';
import BtnAdd from '../atoms/BtnAdd';
import PageTitle from '../atoms/PageTitle';
import Paragrafo from '../atoms/Paragrafo';
import TasksModal from '../modals/TasksModal';
import Menu from '../parts/Menu';
import TasksList from '../parts/TasksList';
import { useTasksContext, useTasksDispatch } from '../../context/GlobalContext';
import axios from 'axios';
import { TasksActionsTypes } from '../../reducer/tasksReducer';
import { ITask } from '../../interfaces/ITask';
import useTaskFetch from '../../hooks/useTaskFetch';

interface TasksSectionsProps {
   titulo: string;
   subtitulo: string;
   status: string;
}

export default function TasksSections({
   titulo,
   subtitulo,
   status
}: TasksSectionsProps) {
   const [isOpen, setOpen] = useState(false);
   const [modalContent, setModalContent] = useState<ITask | null>(null);
   const [tasks] = useTaskFetch();

   function closeModal() {
      setModalContent(null);
      setOpen(false);
   }

   function openModal() {
      setOpen(true);
   }

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
                  <PageTitle title={titulo} />
                  <Paragrafo>{subtitulo}</Paragrafo>
               </div>
               <div className="w-full md:w-1/2 p-2">
                  <div className="flex flex-wrap justify-end -m-2">
                     <div className="w-full md:w-auto p-2">
                        <BtnAdd onClick={openModal} text="Adicionar" />
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <TasksList
            tasks={tasks}
            openModal={openModal}
            setModalContent={setModalContent}
            status={status}
         />
      </Menu>
   );
}
