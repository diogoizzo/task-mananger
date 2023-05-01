import { Dispatch, SetStateAction } from 'react';
import IProject from '../../interfaces/IProject';
import dayjs from 'dayjs';
import axios from 'axios';
import { useProjectDispatch } from '../../context/GlobalContext';
import { ProjectActionsTypes } from '../../reducer/projectReducer';
import Link from 'next/link';

interface ProjectCardProps {
   project: IProject;
   openModal: () => void;
   setModalContent: Dispatch<SetStateAction<IProject | null>>;
}

function ProjectCard({
   project,
   openModal,
   setModalContent
}: ProjectCardProps) {
   const dispatch = useProjectDispatch();
   const leftTime = project.leftTime || 0;
   function deleteProject() {
      axios.delete(`/api/projects/${project.id}`).then((res) => {
         dispatch({
            type: ProjectActionsTypes.removeProject,
            payload: [res.data]
         });
      });
   }

   function completeProject() {
      axios.patch(`/api/projects/${project.id}`).then((res) => {
         dispatch({
            type: ProjectActionsTypes.updateProject,
            payload: [res.data]
         });
      });
   }
   return (
      <div
         className={`bg-gray-50 ${
            project.dueAt === null ? 'min-h-[195px]' : null
         } flex relative shadow-md rounded-md mt-8 `}
      >
         <div className="w-2/3 p-5 flex flex-col justify-between">
            <div>
               <h2 className="font-semibold text-xl text-indigo-900">
                  {project.title}
               </h2>
               <p className="text-sm text-indigo-800 mt-2 text-justify">
                  {project.description}
               </p>
            </div>

            <div className="flex item-center justify-start text-indigo-900 mt-5">
               <div
                  onClick={completeProject}
                  className={`w-5 mr-3 ${
                     project.dueAt === null ? null : 'hidden'
                  }  transform fill-indigo-900 hover:fill-indigo-500 hover:scale-125 transition-transform cursor-pointer`}
               >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                     <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
               </div>
               <div
                  onClick={() => {
                     setModalContent(project);
                     openModal();
                  }}
                  className={`w-5 mr-3 transform ${
                     project.dueAt === null ? null : 'hidden'
                  } hover:text-indigo-500 hover:scale-125 transition-transform cursor-pointer`}
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
               <div className="w-5 mr-2 transform text-indigo-900 hover:text-indigo-500 hover:scale-125 transition-transform">
                  <Link href={`/projetos/${project.id}`}>
                     <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 21 13"
                        version="1.1"
                        stroke="currentColor"
                        fill="currentColor"
                     >
                        <g transform="matrix(0.916745,0,0,0.826537,0.137791,-8.77339)">
                           <g>
                              <g transform="matrix(0.34397,0,0,0.381511,-0.167456,6.14863)">
                                 <path d="M63,30.1C52.9,18.2 42.2,12 32,12C21.8,12 11.1,18.2 1,30.1C0,31.2 0,32.9 1,34C11.1,45.8 21.8,52 32,52C42.2,52 52.9,45.8 63,33.9C63.9,32.8 63.9,31.2 63,30.1ZM32,48C23.3,48 13.6,42.3 4.6,32C13.6,21.7 23.3,16 32,16C40.7,16 50.4,21.7 59.4,32C50.4,42.3 40.7,48 32,48Z" />
                                 <path d="M32,20C25.4,20 20,25.4 20,32C20,38.6 25.4,44 32,44C38.6,44 44,38.6 44,32C44,25.4 38.6,20 32,20ZM32,40C27.6,40 24,36.4 24,32C24,27.6 27.6,24 32,24C36.4,24 40,27.6 40,32C40,36.4 36.4,40 32,40Z" />
                              </g>
                           </g>
                        </g>
                     </svg>
                  </Link>
               </div>
               <div
                  onClick={deleteProject}
                  className="w-5 transform cursor-pointer hover:text-indigo-500 hover:scale-125 transition-transform"
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
         <div
            className={`w-1/3 relative flex flex-col  ${
               project.dueAt === null
                  ? 'items-center justify-center'
                  : 'items-center'
            } bg-indigo-100 rounded-tr-md rounded-br-md`}
         >
            {project.dueAt === null ? (
               <>
                  <div
                     className={` ${
                        leftTime >= 0 ? 'bg-indigo-200' : 'bg-red-200'
                     } relative -top-5 h-32 w-32 flex flex-col justify-center items-center shadow-md shadow-indigo-900/20 rounded-full border-4 border-gray-100`}
                  >
                     <div className="text-center relative -top-1">
                        <p
                           className={`text-5xl font-bold leading-none ${
                              leftTime >= 0 ? 'text-indigo-900' : 'text-red-600'
                           }`}
                        >
                           {Math.abs(leftTime)}
                        </p>
                        <p
                           className={`text-center ${
                              leftTime >= 0 ? 'text-indigo-700' : 'text-red-500'
                           } text-xs leading-none`}
                        >
                           {leftTime > 1 || leftTime < -1 ? 'dias' : 'dia'}{' '}
                           <br />
                           {leftTime >= 0 ? 'restantes' : 'de atraso'}
                        </p>
                     </div>
                  </div>
                  <div className="mt-3 absolute bottom-0 py-2 w-full justify-self-end text-center font-semibold text-indigo-100 rounded-br-md bg-indigo-900">
                     {`Prazo final em ${dayjs(project.dueDate).format(
                        'DD/MM/YYYY'
                     )}`}
                  </div>
               </>
            ) : (
               <div className="h-full flex flex-col w-full">
                  <div className="w-full text-center py-2 text-indigo-100 font-semibold bg-indigo-900">
                     Projeto concluído em
                  </div>
                  <div className="flex h-full w-full justify-center items-center text-indigo-900 font-bold text-2xl ">
                     {dayjs(project.dueAt).format('DD/MM/YYYY')}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
export default ProjectCard;
