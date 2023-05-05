import React, { Dispatch, SetStateAction } from 'react';
import IProject from '../../interfaces/IProject';
import dayjs from 'dayjs';
import ProjectCard from './ProjectCard';
import IProjectsCache from '../../interfaces/IProjectsCache';
import ProjectsListByStatus from './ProjectsListByStatus';

interface ProjectsWithLeftTime extends IProject {
   leftTime?: number;
}

interface ProjectsLIstProps {
   openModal: () => void;
   setModalContent: Dispatch<SetStateAction<IProject | null>>;
   projectsCache: IProjectsCache;
}

function ProjectsLIst({
   openModal,
   setModalContent,
   projectsCache
}: ProjectsLIstProps) {
   return (
      <section>
         <div className=" flex w-full flex-col relative items-center justify-center  font-sans overflow-y-auto">
            <div className="w-full px-8 pb-8">
               <h2 className="text-indigo-900 text-left font-semibold text-2xl mt-8 ">
                  Projetos Ativos
               </h2>
               <ProjectsListByStatus
                  projectsByStatus={projectsCache.activeProjects}
                  setModalContent={setModalContent}
                  openModal={openModal}
               />
            </div>
            <div className="w-full px-8 pb-8">
               <h2 className="text-indigo-900 text-left font-semibold text-2xl ">
                  Projetos Futuros
               </h2>
               <ProjectsListByStatus
                  projectsByStatus={projectsCache.notInitializedProjects}
                  setModalContent={setModalContent}
                  openModal={openModal}
               />
            </div>
            <div className="w-full px-8 pb-8">
               <h2 className="text-indigo-900 text-left font-semibold text-2xl  ">
                  Projetos Concluídos
               </h2>
               <ProjectsListByStatus
                  projectsByStatus={projectsCache.completedProjects}
                  setModalContent={setModalContent}
                  openModal={openModal}
               />
            </div>
         </div>
      </section>
   );
}
export default ProjectsLIst;
