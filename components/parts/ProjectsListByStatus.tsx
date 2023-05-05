import { Dispatch, SetStateAction } from 'react';
import IProject from '../../interfaces/IProject';
import ProjectCard from './ProjectCard';

interface ProjectsListByStatusProps {
   projectsByStatus: IProject[];
   openModal: () => void;
   setModalContent: Dispatch<SetStateAction<IProject | null>>;
}

function ProjectsListByStatus({
   projectsByStatus,
   openModal,
   setModalContent
}: ProjectsListByStatusProps) {
   return (
      <>
         {projectsByStatus?.length > 0 ? (
            projectsByStatus?.map((project) => (
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
      </>
   );
}
export default ProjectsListByStatus;
