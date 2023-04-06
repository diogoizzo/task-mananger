import { Dispatch, SetStateAction } from 'react';
import IProject from '../../interfaces/IProject';
import dayjs from 'dayjs';
import axios from 'axios';
import { useProjectDispatch } from '../../context/GlobalContext';
import { ProjectActionsTypes } from '../../reducer/projectReducer';

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
      <div className="bg-gray-50 min-h-[195px] flex relative shadow-md rounded-md mt-8 ">
         <div className="w-2/3 p-5 flex flex-col justify-between">
            <div>
               <h2 className="font-semibold text-xl text-indigo-900">
                  {project.title}
               </h2>
               <p className="text-sm text-indigo-800 mt-2">
                  {project.description}
               </p>
            </div>

            <div className="flex item-center justify-start text-indigo-900 mt-5">
               <div
                  onClick={completeProject}
                  className="w-5 mr-2  transform fill-indigo-900 hover:fill-indigo-500 hover:scale-125 transition-transform"
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
                  onClick={deleteProject}
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
            <div className=" bg-indigo-200 relative -top-5 h-32 w-32 flex flex-col justify-center items-center shadow-md shadow-indigo-900/20 rounded-full border-4 border-gray-100">
               <div className="text-center relative -top-1">
                  <p className="text-5xl font-bold leading-none text-indigo-900">
                     {project.leftTime}
                  </p>
                  <p className="text-center text-indigo-700 text-xs leading-none">
                     dias <br /> restantes
                  </p>
               </div>
            </div>
            <div className="mt-3 absolute bottom-0 py-2 w-full justify-self-end text-center font-semibold text-indigo-100 rounded-br-md bg-indigo-900">
               {`Prazo final em ${dayjs(project.dueDate).format('DD/MM/YYYY')}`}
            </div>
         </div>
      </div>
   );
}
export default ProjectCard;