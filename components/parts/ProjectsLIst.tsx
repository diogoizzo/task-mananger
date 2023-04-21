import React, { Dispatch, SetStateAction } from 'react';
import IProject from '../../interfaces/IProject';
import dayjs from 'dayjs';
import ProjectCard from './ProjectCard';

interface ProjectsWithLeftTime extends IProject {
   leftTime?: number;
}

interface ProjectsLIstProps {
   openModal: () => void;
   setModalContent: Dispatch<SetStateAction<IProject | null>>;
   projects: IProject[];
}

function ProjectsLIst({
   openModal,
   setModalContent,
   projects
}: ProjectsLIstProps) {
   const ProjectsWithLeftTime: ProjectsWithLeftTime[] = projects.map(
      (item: ProjectsWithLeftTime) => {
         let diffToNow = dayjs(item?.dueDate).diff(dayjs(), 'day');
         item.leftTime = Number(diffToNow > 0 ? diffToNow : 0);
         return item;
      }
   );

   const orderedProjects = ProjectsWithLeftTime.sort(
      (a: any, b: any) => a.leftTime - b.leftTime
   );

   const projectsNotInitialized = orderedProjects.filter(
      (project) =>
         Number(new Date(project.startDate)) > Date.now() &&
         project.dueAt === null
   );

   const projectsActive = orderedProjects.filter(
      (project) =>
         Number(new Date(project.startDate)) <= Date.now() &&
         project.dueAt === null
   );

   const projectsCompleted = orderedProjects.filter(
      (project) => project.dueAt !== null
   );

   return (
      <section>
         <div className=" flex w-full flex-col relative items-center justify-center  font-sans overflow-y-auto">
            <div className="w-full px-8 pb-8">
               <h2 className="text-indigo-900 text-left font-semibold text-2xl mt-8 ">
                  Projetos Ativos
               </h2>
               {projectsActive?.length > 0 ? (
                  projectsActive.map((project) => (
                     <ProjectCard
                        key={project.id}
                        project={project}
                        openModal={openModal}
                        setModalContent={setModalContent}
                     />
                  ))
               ) : (
                  <div className="mt-6">
                     <h3 className=" text-indigo-600 font-semibold text-lg text-center">
                        Nenhuma projeto ativo.
                     </h3>
                  </div>
               )}
            </div>
            <div className="w-full px-8 pb-8">
               <h2 className="text-indigo-900 text-left font-semibold text-2xl ">
                  Projetos Futuros
               </h2>
               {projectsNotInitialized?.length > 0 ? (
                  projectsNotInitialized.map((project) => (
                     <ProjectCard
                        key={project.id}
                        project={project}
                        openModal={openModal}
                        setModalContent={setModalContent}
                     />
                  ))
               ) : (
                  <div className="mt-6">
                     <h3 className=" text-indigo-600 font-semibold text-lg text-center">
                        Nenhum projeto futuro.
                     </h3>
                  </div>
               )}
            </div>
            <div className="w-full px-8 pb-8">
               <h2 className="text-indigo-900 text-left font-semibold text-2xl  ">
                  Projetos Concluídos
               </h2>
               {projectsCompleted?.length > 0 ? (
                  projectsCompleted.map((project) => (
                     <ProjectCard
                        key={project.id}
                        project={project}
                        openModal={openModal}
                        setModalContent={setModalContent}
                     />
                  ))
               ) : (
                  <div className="mt-6">
                     <h3 className=" text-indigo-600 font-semibold text-lg text-center">
                        Nenhuma projeto concluído.
                     </h3>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}
export default ProjectsLIst;
