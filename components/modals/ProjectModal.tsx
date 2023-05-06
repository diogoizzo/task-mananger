import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import Input from '../atoms/Input';
import IProject from '../../interfaces/IProject';
import { useRouter } from 'next/router';
import useProjectService from '../../hooks/useProjectServices';

interface ProjectModalProps {
   modalContent: IProject | null;
   setModalContent: Dispatch<SetStateAction<IProject | null>>;
   isOpen: boolean;
   closeModal: () => void;
}

export default function ProjectModal({
   isOpen,
   closeModal,
   modalContent,
   setModalContent
}: ProjectModalProps) {
   const projectServices = useProjectService();
   const [formData, setFormData] = useState({
      startDate: '',
      dueDate: '',
      title: '',
      description: ''
   });
   const router = useRouter();

   useEffect(() => {
      if (modalContent) {
         setFormData({
            startDate: dayjs(modalContent.startDate).format('YYYY-MM-DD'),
            dueDate: dayjs(modalContent.dueDate).format('YYYY-MM-DD'),
            title: modalContent.title,
            description: modalContent.description
         });
      }
   }, [modalContent]);

   function clearFormData() {
      setFormData({
         startDate: '',
         dueDate: '',
         title: '',
         description: ''
      });
   }

   async function createProject() {
      const id = await projectServices.create(formData);
      clearFormData();
      closeModal();
      router.push(`/projetos/${id}`);
   }
   async function updateProject() {
      const id = await projectServices.update(modalContent?.id || '', formData);
      clearFormData();
      closeModal();
      router.push(`/projetos/${id}`);
   }

   function cancelHandler() {
      clearFormData();
      closeModal();
   }
   return (
      <Portal>
         <Transition show={isOpen} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-50 "
               onClose={() => {
                  setModalContent(null);
                  clearFormData();
                  closeModal();
               }}
            >
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
               </Transition.Child>
               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex items-start mt-10 justify-center text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95 -mt-10"
                        enterTo="opacity-100 scale-100 mt-10"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 mt-10"
                        leaveTo="opacity-0 scale-95 -mt-10"
                     >
                        <Dialog.Panel className="max-w-4xl max-h-[100vh] transform overflow-y-auto border border-indigo-300 rounded-xl bg-indigo-50 p-8 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-2xl font-bold capitalize text-center leading-6 text-indigo-900"
                           >
                              Novo Projeto
                           </Dialog.Title>
                           <form className="mt-10">
                              <Input
                                 value={formData.title}
                                 onChange={(e) =>
                                    setFormData((prev) => ({
                                       ...prev,
                                       title: e.target.value
                                    }))
                                 }
                                 titulo="Nome"
                                 placeholder="Insira o nome do projeto"
                              />

                              <div className="flex w-full justify-between flex-wrap ">
                                 <div className="w-1/2 mt-3 pr-1">
                                    <Input
                                       value={formData.startDate}
                                       onChange={(e) =>
                                          setFormData((prev) => ({
                                             ...prev,
                                             startDate: e.target.value
                                          }))
                                       }
                                       titulo="Data de início"
                                       type="date"
                                    />
                                 </div>
                                 <div className="w-1/2 mt-3 pl-1">
                                    <Input
                                       value={formData.dueDate}
                                       onChange={(e) =>
                                          setFormData((prev) => ({
                                             ...prev,
                                             dueDate: e.target.value
                                          }))
                                       }
                                       titulo="Prazo final"
                                       type="date"
                                    />
                                 </div>
                                 <div className="relative w-full text-center mt-6 h-28 ">
                                    <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-md font-semibold text-indigo-900 px-1 bg-indigo-50">
                                       Descrição
                                    </span>
                                    <textarea
                                       value={formData.description}
                                       onChange={(e) =>
                                          setFormData((prev) => ({
                                             ...prev,
                                             description: e.target.value
                                          }))
                                       }
                                       className="border bg-indigo-50 w-full h-full outline-none border-indigo-600 hover:border-indigo-300 focus-within:border-black rounded-lg p-3 text-justify text-gray-600 placeholder-gray-600 font-semibold"
                                       name="descricao"
                                       id="descricao"
                                       placeholder="Insira a descrição do novo projeto"
                                    ></textarea>
                                 </div>
                              </div>
                              <div className=" w-full flex justify-center space-x-5 mt-10">
                                 <button
                                    type="button"
                                    onClick={
                                       modalContent
                                          ? updateProject
                                          : createProject
                                    }
                                    className="inline-flex border-indigo-200 justify-center rounded-md border  bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 >
                                    Salvar
                                 </button>
                                 <button
                                    type="button"
                                    className="inline-flex justify-center border-indigo-200  rounded-md border  bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={cancelHandler}
                                 >
                                    Cancelar
                                 </button>
                              </div>
                           </form>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </Portal>
   );
}
