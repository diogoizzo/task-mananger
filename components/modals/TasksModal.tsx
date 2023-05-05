import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import {
   Dispatch,
   Fragment,
   SetStateAction,
   useEffect,
   useRef,
   useState
} from 'react';
import { Portal } from 'react-portal';
import { ITask } from '../../interfaces/ITask';
import useProjectFetch from '../../hooks/useProjectFetch';
import IProject from '../../interfaces/IProject';
import { useRouter } from 'next/router';
import useTaskServices from '../../hooks/useTaskServices';
import TaskForm from '../parts/TaskForm';
import ITaskFrom from '../../interfaces/ITaskForm';

interface TasksModalProps {
   modalContent: ITaskFrom | null;
   setModalContent: Dispatch<SetStateAction<ITaskFrom | null>>;
   isOpen: boolean;
   closeModal: () => void;
   activeProject?: IProject;
}

export default function TasksModal({
   isOpen,
   closeModal,
   modalContent,
   setModalContent,
   activeProject
}: TasksModalProps) {
   const formInitialValue = {
      startDate: '',
      dueDate: '',
      title: '',
      description: '',
      status: '',
      project: ''
   };

   const [formData, setFormData] = useState(formInitialValue);
   const taskServices = useTaskServices();
   const projectBeforeAlterationId = useRef<string>();
   const router = useRouter();

   useEffect(() => {
      if (modalContent) {
         setFormData({
            startDate: dayjs(modalContent.startDate).format('YYYY-MM-DD'),
            dueDate: dayjs(modalContent.dueDate).format('YYYY-MM-DD'),
            title: modalContent.title,
            description: modalContent.description,
            status: modalContent.status,
            project: modalContent.projetoId ?? ' '
         });
         projectBeforeAlterationId.current = modalContent.projetoId;
      }
      if (activeProject) {
         setFormData((prev) => ({
            ...prev,
            project: String(activeProject.id)
         }));
      }
   }, [modalContent, activeProject]);

   function clearFormData() {
      if (router.query.projectId) {
         setFormData((prev) => ({
            ...formInitialValue,
            project: prev.project
         }));
      } else {
         setFormData(formInitialValue);
      }
   }

   function createTask() {
      taskServices.create(formData);
      clearFormData();
      closeModal();
   }

   function updateTask() {
      taskServices.update(
         projectBeforeAlterationId.current || '',
         modalContent?.id || '',
         formData
      );
      clearFormData();
      closeModal();
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
                              Nova Tarefa
                           </Dialog.Title>
                           <TaskForm
                              formData={formData}
                              setFormData={setFormData}
                              modalContent={modalContent}
                              createTask={createTask}
                              updateTask={updateTask}
                              cancelHandler={cancelHandler}
                           />
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </Portal>
   );
}
