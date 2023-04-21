import { useEffect, useState } from 'react';
import BtnAdd from '../atoms/BtnAdd';
import PageTitle from '../atoms/PageTitle';
import Paragrafo from '../atoms/Paragrafo';
import Menu from '../parts/Menu';
import {
   useProjectContext,
   useProjectDispatch
} from '../../context/GlobalContext';
import axios from 'axios';
import { ProjectActionsTypes } from '../../reducer/projectReducer';
import ProjectModal from '../modals/ProjectModal';
import IProject from '../../interfaces/IProject';
import ProjectsLIst from '../parts/ProjectsLIst';
import useProjectFetch from '../../hooks/useProjectFetch';

export default function ProjectSection() {
   const [isOpen, setOpen] = useState(false);
   const [modalContent, setModalContent] = useState<IProject | null>(null);
   const [projects] = useProjectFetch();

   function closeModal() {
      setModalContent(null);
      setOpen(false);
   }

   function openModal() {
      setOpen(true);
   }

   return (
      <Menu>
         <ProjectModal
            isOpen={isOpen}
            closeModal={closeModal}
            modalContent={modalContent}
            setModalContent={setModalContent}
         />
         <section className="bg-white p-8 text-indigo-900 sticky top-0 z-30 shadow-md ">
            <div className="flex flex-wrap items-center -m-2">
               <div className="w-full md:w-1/2 p-2">
                  <PageTitle title={'Projetos'} />
                  <Paragrafo>
                     Veja aqui a lista de todos os seus projetos
                  </Paragrafo>
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

         <ProjectsLIst
            projects={projects}
            openModal={openModal}
            setModalContent={setModalContent}
         />
      </Menu>
   );
}
