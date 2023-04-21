import { Dialog, Listbox, Transition } from '@headlessui/react';
import axios from 'axios';
import {
   Dispatch,
   Fragment,
   SetStateAction,
   useEffect,
   useRef,
   useState
} from 'react';
import { Portal } from 'react-portal';
import IProject from '../../interfaces/IProject';
import { ITask } from '../../interfaces/ITask';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import {
   useProjectDispatch,
   useTasksContext,
   useTasksDispatch
} from '../../context/GlobalContext';
import { TasksActionsTypes } from '../../reducer/tasksReducer';
import { ProjectActionsTypes } from '../../reducer/projectReducer';

interface TasksModalProps {
   modalContent: IProject | null;
   setModalContent: Dispatch<SetStateAction<IProject | null>>;
   isOpen: boolean;
   closeModal: () => void;
}

export default function TasksModal({
   isOpen,
   closeModal,
   modalContent,
   setModalContent
}: TasksModalProps) {
   const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
   const [selectedDependencies, setSelectedDependencies] = useState<
      ITask[] | null
   >([]);
   const dispatch = useTasksDispatch();
   const noTaskSelected = useRef<HTMLDivElement | null>(null);
   const errorSave = useRef<HTMLDivElement | null>(null);
   const sucessSave = useRef<HTMLDivElement | null>(null);
   const projectDispatch = useProjectDispatch();

   const allDependencyTask = modalContent?.tarefas.filter((task) => {
      return task.id !== selectedTask?.id;
   });

   useEffect(() => {
      if (selectedTask && selectedTask.dependencies.length > 0) {
         setSelectedDependencies(selectedTask.dependencies);
      } else {
         setSelectedDependencies([]);
      }
   }, [selectedTask]);

   function clearContent() {
      setSelectedDependencies(null);
      setSelectedTask(null);
   }

   function cancelHandler() {
      setModalContent(null);
      clearContent();
      closeModal();
   }

   function resetMsgNoTask() {
      noTaskSelected.current?.classList.remove('flex');
      noTaskSelected.current?.classList.add('hidden');
   }

   function updateDependencies() {
      if (selectedTask) {
         let newDependencies = selectedDependencies?.map((task) => {
            return {
               id: task.id
            };
         });
         axios
            .put(`/api/tasks/${selectedTask.id}`, { newDependencies })
            .then((res) => {
               dispatch({
                  type: TasksActionsTypes.updateTask,
                  payload: [res.data]
               });
               let newProjectWithDependencies = modalContent;
               if (newProjectWithDependencies) {
                  newProjectWithDependencies.tarefas[
                     newProjectWithDependencies.tarefas.findIndex(
                        (task) => task.id === selectedTask.id
                     )
                  ] = res.data;
                  projectDispatch({
                     type: ProjectActionsTypes.updateProject,
                     payload: [newProjectWithDependencies]
                  });
               }
               clearContent();
               sucessSave.current?.classList.remove('hidden');
               setTimeout(() => {
                  sucessSave.current?.classList.add('hidden');
               }, 2500);
            })
            .catch((e) => {
               errorSave.current?.classList.remove('hidden');
               setTimeout(() => {
                  errorSave.current?.classList.add('hidden');
               }, 2500);
               console.log('Ocorreu um erro ao salvar a tarefa');
            });
      } else {
         noTaskSelected.current?.classList.add('flex');
         noTaskSelected.current?.classList.remove('hidden');
      }
   }

   return (
      <Portal>
         <Transition show={isOpen} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-30 overflow-y-visible "
               onClose={() => {
                  setModalContent(null);
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
               <div className="fixed inset-0 overflow-y-visible ">
                  <div className="flex items-start mt-10 p-10 justify-center text-center">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95 -mt-10"
                        enterTo="opacity-100 scale-100 mt-10"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 mt-10"
                        leaveTo="opacity-0 scale-95 -mt-10"
                     >
                        <Dialog.Panel className="relative w-[38rem]  transform overflow-y-visible border border-indigo-300 rounded-xl bg-indigo-50 px-6 py-10 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-2xl font-bold capitalize text-center leading-6 text-indigo-900"
                           >
                              Gerenciar Dependências
                           </Dialog.Title>
                           <h4 className="font-semibold text-lg text-indigo-900 mt-9">
                              Tarefa:
                           </h4>
                           <p className="text-sm text-indigo-800 mb-3">
                              Escolha a tarefa para a qual deseja selecionar as
                              dependências.
                           </p>
                           <div className="realtive">
                              <Listbox
                                 value={selectedTask}
                                 onChange={(e) => {
                                    setSelectedTask(e);
                                    resetMsgNoTask();
                                 }}
                              >
                                 <div className="relative mt-1 z-50">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
                                       <span className="block truncate">
                                          {selectedTask?.title ??
                                             'Nenhuma tarefa selecionada'}
                                       </span>
                                       <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                          <ChevronUpDownIcon
                                             className="h-5 w-5 text-gray-400"
                                             aria-hidden="true"
                                          />
                                       </span>
                                    </Listbox.Button>
                                    <Transition
                                       as={Fragment}
                                       leave="transition ease-in duration-100"
                                       leaveFrom="opacity-100"
                                       leaveTo="opacity-0"
                                    >
                                       <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                          {modalContent?.tarefas.map(
                                             (task, taskIdx) => (
                                                <Listbox.Option
                                                   key={taskIdx}
                                                   className={({ active }) =>
                                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                         active
                                                            ? 'bg-indigo-100 text-indigo-900'
                                                            : 'text-gray-900'
                                                      }`
                                                   }
                                                   value={task}
                                                >
                                                   {({ selected }) => (
                                                      <>
                                                         <span
                                                            className={`block truncate ${
                                                               selected
                                                                  ? 'font-medium'
                                                                  : 'font-normal'
                                                            }`}
                                                         >
                                                            {task.title}
                                                         </span>
                                                         {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                                               <CheckIcon
                                                                  className="h-5 w-5"
                                                                  aria-hidden="true"
                                                               />
                                                            </span>
                                                         ) : null}
                                                      </>
                                                   )}
                                                </Listbox.Option>
                                             )
                                          )}
                                       </Listbox.Options>
                                    </Transition>
                                 </div>
                              </Listbox>
                           </div>
                           <div
                              // eslint-disable-next-line no-use-before-define
                              className="hidden items-center justify-start space-x-1 mt-2 "
                              ref={noTaskSelected}
                           >
                              <span className="flex-shrink-0 self-center w-4">
                                 <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M10 12C9.75278 12 9.5111 12.0733 9.30554 12.2107C9.09998 12.348 8.93976 12.5432 8.84516 12.7716C8.75055 13.0001 8.72579 13.2514 8.77402 13.4939C8.82225 13.7363 8.94131 13.9591 9.11612 14.1339C9.29094 14.3087 9.51367 14.4277 9.75614 14.476C9.99862 14.5242 10.25 14.4995 10.4784 14.4049C10.7068 14.3102 10.902 14.15 11.0393 13.9445C11.1767 13.7389 11.25 13.4972 11.25 13.25C11.25 12.9185 11.1183 12.6005 10.8839 12.3661C10.6495 12.1317 10.3315 12 10 12ZM10 10.5C10.2652 10.5 10.5196 10.3946 10.7071 10.2071C10.8946 10.0196 11 9.76522 11 9.5V6.5C11 6.23478 10.8946 5.98043 10.7071 5.79289C10.5196 5.60536 10.2652 5.5 10 5.5C9.73479 5.5 9.48043 5.60536 9.2929 5.79289C9.10536 5.98043 9 6.23478 9 6.5V9.5C9 9.76522 9.10536 10.0196 9.2929 10.2071C9.48043 10.3946 9.73479 10.5 10 10.5ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18Z"
                                       fill="#ef4444"
                                    ></path>
                                 </svg>
                              </span>
                              <p className=" text-red-500 text-sm">
                                 É necessário selecionar um tarefa!
                              </p>
                           </div>
                           <h4 className="font-semibold text-lg text-indigo-900 mt-5">
                              Dependências:
                           </h4>
                           <p className="text-sm text-indigo-800 mb-3">
                              Escolha as tarefas que precisam ser realizadas
                              antes da tarefa selecionada acima.
                           </p>
                           <div className="realtive z-40">
                              <Listbox
                                 value={selectedDependencies}
                                 by="id"
                                 onChange={setSelectedDependencies}
                                 multiple
                              >
                                 <div className="relative overflow-visible mt-1 z-40">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
                                       <span className="block truncate">
                                          {selectedDependencies &&
                                          selectedDependencies.length > 0
                                             ? `${selectedDependencies?.length} tarefas selecionadas`
                                             : 'Nenhuma tarefa selecionada'}
                                       </span>
                                       <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                          <ChevronUpDownIcon
                                             className="h-5 w-5 text-gray-400"
                                             aria-hidden="true"
                                          />
                                       </span>
                                    </Listbox.Button>
                                    <Transition
                                       as={Fragment}
                                       leave="transition ease-in duration-100"
                                       leaveFrom="opacity-100"
                                       leaveTo="opacity-0"
                                    >
                                       <Listbox.Options className="absolute overflow-visible z-50 mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                          {allDependencyTask?.map(
                                             (task, taskIdx) => (
                                                <Listbox.Option
                                                   key={taskIdx}
                                                   className={({ active }) =>
                                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                         active
                                                            ? 'bg-indigo-100 text-indigo-900'
                                                            : 'text-gray-900'
                                                      }`
                                                   }
                                                   value={task}
                                                >
                                                   {({ selected }) => (
                                                      <>
                                                         <span
                                                            className={`block truncate ${
                                                               selected
                                                                  ? 'font-medium'
                                                                  : 'font-normal'
                                                            }`}
                                                         >
                                                            {task.title}
                                                         </span>
                                                         {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                                               <CheckIcon
                                                                  className="h-5 w-5"
                                                                  aria-hidden="true"
                                                               />
                                                            </span>
                                                         ) : null}
                                                      </>
                                                   )}
                                                </Listbox.Option>
                                             )
                                          )}
                                       </Listbox.Options>
                                    </Transition>
                                 </div>
                              </Listbox>
                           </div>
                           <div
                              className="py-3 mt-2 w-full hidden"
                              ref={sucessSave}
                           >
                              <div className=" mx-auto">
                                 <div className="p-4 bg-green-200 rounded-lg">
                                    <div className="flex w-full h-full items-center justify-between">
                                       <div className="flex items-center pr-6">
                                          <span className="flex-shrink-0 self-center">
                                             <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   d="M12.72 6.79L8.43001 11.09L6.78 9.44C6.69036 9.33532 6.58004 9.2503 6.45597 9.19027C6.33191 9.13025 6.19678 9.09652 6.05906 9.0912C5.92134 9.08588 5.78401 9.10909 5.65568 9.15936C5.52736 9.20964 5.41081 9.28589 5.31335 9.38335C5.2159 9.4808 5.13964 9.59735 5.08937 9.72568C5.03909 9.854 5.01589 9.99133 5.02121 10.1291C5.02653 10.2668 5.06026 10.4019 5.12028 10.526C5.1803 10.65 5.26532 10.7604 5.37 10.85L7.72 13.21C7.81344 13.3027 7.92426 13.376 8.0461 13.4258C8.16794 13.4755 8.2984 13.5008 8.43001 13.5C8.69234 13.4989 8.94374 13.3947 9.13 13.21L14.13 8.21C14.2237 8.11704 14.2981 8.00644 14.3489 7.88458C14.3997 7.76272 14.4258 7.63201 14.4258 7.5C14.4258 7.36799 14.3997 7.23728 14.3489 7.11542C14.2981 6.99356 14.2237 6.88296 14.13 6.79C13.9426 6.60375 13.6892 6.49921 13.425 6.49921C13.1608 6.49921 12.9074 6.60375 12.72 6.79ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18Z"
                                                   fill="#08660D"
                                                ></path>
                                             </svg>
                                          </span>
                                          <span className="text-sm leading-5 text-green-800 font-medium ml-3">
                                             As dependências da tarefa foram
                                             salvas com sucesso, você pode
                                             escolher outra tarefa e suas
                                             depedências
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div
                              className="py-3 w-[34rem] mt-2 hidden"
                              ref={errorSave}
                           >
                              <div className=" mx-auto">
                                 <div className="p-4 bg-red-200 rounded-lg">
                                    <div className="flex w-full h-full items-center justify-between">
                                       <div className="flex items-center pr-6">
                                          <span className="flex-shrink-0 self-start">
                                             <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   d="M10 12C9.75278 12 9.5111 12.0733 9.30554 12.2107C9.09998 12.348 8.93976 12.5432 8.84516 12.7716C8.75055 13.0001 8.72579 13.2514 8.77402 13.4939C8.82225 13.7363 8.94131 13.9591 9.11612 14.1339C9.29094 14.3087 9.51367 14.4277 9.75614 14.476C9.99862 14.5242 10.25 14.4995 10.4784 14.4049C10.7068 14.3102 10.902 14.15 11.0393 13.9445C11.1767 13.7389 11.25 13.4972 11.25 13.25C11.25 12.9185 11.1183 12.6005 10.8839 12.3661C10.6495 12.1317 10.3315 12 10 12ZM10 10.5C10.2652 10.5 10.5196 10.3946 10.7071 10.2071C10.8946 10.0196 11 9.76522 11 9.5V6.5C11 6.23478 10.8946 5.98043 10.7071 5.79289C10.5196 5.60536 10.2652 5.5 10 5.5C9.73479 5.5 9.48043 5.60536 9.2929 5.79289C9.10536 5.98043 9 6.23478 9 6.5V9.5C9 9.76522 9.10536 10.0196 9.2929 10.2071C9.48043 10.3946 9.73479 10.5 10 10.5ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18Z"
                                                   fill="#7A0C2E"
                                                ></path>
                                             </svg>
                                          </span>
                                          <span className="text-sm leading-5 text-red-900 font-medium ml-3">
                                             Ocorreu um erro ao salvar a tarefa,
                                             por favor tente novamente mais
                                             tarde.
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className=" w-full flex justify-center space-x-5 mt-10">
                              <button
                                 type="button"
                                 onClick={() => {
                                    updateDependencies();
                                 }}
                                 className="inline-flex justify-center border-indigo-200 rounded-md border  bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              >
                                 Salvar
                              </button>
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-indigo-200 bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={cancelHandler}
                              >
                                 Cancelar
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </Portal>
   );
}
