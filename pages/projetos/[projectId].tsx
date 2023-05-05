import Menu from '../../components/parts/Menu';
import PageTitle from '../../components/atoms/PageTitle';
import Paragrafo from '../../components/atoms/Paragrafo';
import BtnAdd from '../../components/atoms/BtnAdd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { ITask } from '../../interfaces/ITask';
import TasksModal from '../../components/modals/TasksModal';
import TasksList from '../../components/parts/TasksList';
import useProjectFetch from '../../hooks/useProjectFetch';
import { useState } from 'react';
import DependenciesModal from '../../components/modals/DependenciesModal';
import IProject from '../../interfaces/IProject';
import useTaskFetch from '../../hooks/useTaskFetch';
import useTaskCache from '../../hooks/useTasksCache';

function ProjectId() {
   const [projects] = useProjectFetch();
   const [isOpen, setOpen] = useState(false);
   const [modalContent, setModalContent] = useState<ITask | null>(null);
   const [isModalDependenciesOpen, setModalDependenciesOpen] = useState(false);
   const [dependciesModalContent, setDependenciesModalContent] =
      useState<IProject | null>(null);

   const router = useRouter();
   const activeProject = projects.find(
      (project) => project.id === router.query.projectId
   );

   useTaskFetch();

   function closeModal() {
      setModalContent(null);
      setOpen(false);
   }

   function closeDependenciesModal() {
      setDependenciesModalContent(null);
      setModalDependenciesOpen(false);
   }

   function openModal() {
      setOpen(true);
   }

   function toDo() {
      return (
         activeProject?.tasks?.filter(
            (task: ITask) => task.status !== 'concluida'
         ).length || 0
      );
   }

   function percentDone(): number {
      const done =
         activeProject?.tasks?.filter(
            (task: ITask) => task.status === 'concluida'
         ).length || 0;
      const total = activeProject?.tasks?.length || 0;
      return Math.round((100 * done) / total);
   }

   return (
      <Menu>
         <TasksModal
            isOpen={isOpen}
            closeModal={closeModal}
            modalContent={modalContent}
            setModalContent={setModalContent}
            activeProject={activeProject}
         />
         <DependenciesModal
            isOpen={isModalDependenciesOpen}
            closeModal={closeDependenciesModal}
            modalContent={dependciesModalContent}
            setModalContent={setDependenciesModalContent}
         />
         <section className="bg-white p-8 text-indigo-900  shadow-md ">
            <div className="flex items-center -m-2 relative">
               <div
                  className={`flex flex-col ${
                     activeProject?.dueAt !== null ? 'w-full' : 'w-2/3'
                  }  p-2`}
               >
                  <PageTitle title={activeProject?.title || ''} />

                  <p className="font-semibold mb-4 mt-2 tracking-wider shadow-sm shadow-indigo-900/50 text-xs bg-indigo-800 w-fit p-1 px-5 uppercase rounded-full text-indigo-100">
                     {toDo() === 0
                        ? 'Todas as tarefas concluídas'
                        : toDo() > 1
                        ? `${percentDone()}% concluído - Faltam ${toDo()} tarefas`
                        : `${percentDone()}% concluído - Falta ${toDo()} tarefa`}
                  </p>
                  <div className="flex font-medium text-indigo-90 mt-2 border-y border-indigo-100 py-4">
                     <div className="w-full md:w-1/3 text-left  ">
                        {`Data da criação:`}
                        <br />
                        {`${dayjs(activeProject?.createdAt).format(
                           'DD/MM/YYYY'
                        )}`}
                     </div>
                     <div className="w-full md:w-1/3 text-center">
                        {`Data de inicio:`}
                        <br />
                        {`${dayjs(activeProject?.startDate).format(
                           'DD/MM/YYYY'
                        )}`}
                     </div>
                     {activeProject?.dueAt === null ? (
                        <div className="w-full md:w-1/3 text-right">
                           {`Prazo para conclusão:`}
                           <br />
                           {`${dayjs(activeProject?.dueDate).format(
                              'DD/MM/YYYY'
                           )}`}
                        </div>
                     ) : (
                        <div className="w-full md:w-1/3 text-right">
                           {`Data da conclusão:`}
                           <br />
                           {`${dayjs(activeProject?.dueAt).format(
                              'DD/MM/YYYY'
                           )}`}
                        </div>
                     )}
                  </div>
                  <Paragrafo className="mt-4 text-justify">
                     {activeProject?.description}
                  </Paragrafo>
               </div>
               <div
                  className={` ${
                     activeProject?.dueAt !== null
                        ? 'absolute right-0 top-0 -mr-4'
                        : null
                  } p-5 w-1/3   space-y-2`}
               >
                  <BtnAdd
                     onClick={openModal}
                     text="Adicionar Tarefa"
                     className={`${
                        activeProject?.dueAt !== null ? 'hidden' : null
                     }`}
                  />
                  <BtnAdd
                     onClick={() => {
                        setDependenciesModalContent(activeProject ?? null);
                        setModalDependenciesOpen(true); //
                     }}
                     text="Gerenciar Dependências"
                     className={`${
                        activeProject?.dueAt !== null ? 'hidden' : null
                     }`}
                     manage
                  />
                  <Link
                     href={'/projetos'}
                     className="flex text-[#e0e7ff] flex-wrap items-center justify-center py-3 px-4 w-full text-base font-medium transition-colors bg-indigo-600 hover:bg-indigo-500 rounded-md shadow-button"
                  >
                     <span className="w-5 mr-2">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 512 512"
                        >
                           <path
                              fill="#e0e7ff"
                              d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"
                           />
                        </svg>
                     </span>
                     Voltar
                  </Link>
               </div>
            </div>
         </section>
         <section>
            <h2 className="text-indigo-900 text-left font-semibold text-2xl mt-8 px-8">
               Ativas
            </h2>
            <TasksList
               tasks={activeProject?.tasks || []}
               openModal={openModal}
               setModalContent={setModalContent}
               status={'ativas'}
               classNameProp="mt-10 text-indigo-600"
            />
            <h2 className="text-indigo-900 text-left font-semibold text-2xl mt-8 px-8">
               Concluídas
            </h2>
            <TasksList
               tasks={activeProject?.tasks || []}
               openModal={openModal}
               setModalContent={setModalContent}
               status={'concluida'}
               classNameProp="mt-10 text-indigo-600"
            />
         </section>
      </Menu>
   );
}

ProjectId.auth = true;

export default ProjectId;
