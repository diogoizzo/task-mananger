import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import {
   Dispatch,
   Fragment,
   SetStateAction,
   useCallback,
   useEffect,
   useState
} from 'react';
import { Portal } from 'react-portal';
import { useTasksDispatch } from '../../context/GlobalContext';
import { ITask } from '../../interfaces/ITask';
import { TasksActionsTypes } from '../../reducer/tasksReducer';
import Input from '../atoms/Input';

interface TasksModalProps {
   modalContent: ITask | null;
   setModalContent: Dispatch<SetStateAction<ITask | null>>;
   isOpen: boolean;
   closeModal: () => void;
}

export default function TasksModal({
   isOpen,
   closeModal,
   modalContent,
   setModalContent
}: TasksModalProps) {
   const [formData, setFormData] = useState({
      startDate: '',
      dueDate: '',
      title: '',
      description: '',
      status: ''
   });

   const dataCallback = useCallback(() => {
      if (modalContent) {
         setFormData({
            startDate: dayjs(modalContent.startDate).format('YYYY-MM-DD'),
            dueDate: dayjs(modalContent.dueDate).format('YYYY-MM-DD'),
            title: modalContent.title,
            description: modalContent.description,
            status: modalContent.status
         });
      }
   }, [modalContent]);

   useEffect(() => {
      dataCallback();
      return () => {
         clearFormData();
      };
   }, [modalContent, dataCallback]);

   const dispatch = useTasksDispatch();

   function clearFormData() {
      setFormData({
         startDate: '',
         dueDate: '',
         title: '',
         description: '',
         status: ''
      });
   }

   function criaTarefa() {
      axios.post('/api/tasks', formData).then((res) => {
         dispatch({
            type: TasksActionsTypes.addTask,
            payload: [res.data]
         });
      });
      clearFormData();
      closeModal();
   }
   function atualizaTarefa() {
      axios.put(`/api/tasks/${modalContent?.id}`, formData).then((res) => {
         dispatch({
            type: TasksActionsTypes.updateTask,
            payload: [res.data]
         });
      });
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
                        <Dialog.Panel className="max-w-4xl max-h-[100vh] transform overflow-y-auto border border-indigo-300 rounded-xl bg-indigo-50 p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-2xl font-bold capitalize text-center leading-6 text-indigo-900"
                           >
                              Nova tarefa
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
                                 placeholder="Insira o nome da tarefa"
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
                                       placeholder="Data de início da tarefa"
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
                                 <div className="w-full mt-3">
                                    <div className="relative w-full mt-3 h-12 py-4 px-3 border border-indigo-600 hover:border-indigo-300 focus-within:border-black rounded-lg">
                                       <label
                                          htmlFor="status"
                                          className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-md font-semibold text-indigo-900 px-1 bg-indigo-50"
                                       >
                                          Status
                                       </label>

                                       <select
                                          value={formData.status}
                                          onChange={(e) =>
                                             setFormData((prev) => ({
                                                ...prev,
                                                status: e.target.value
                                             }))
                                          }
                                          id="status"
                                          className="w-full outline-none bg-transparent text-gray-600 placeholder-gray-400 font-semibold"
                                       >
                                          <option value="">
                                             Escolha o status atual da tarefa
                                          </option>
                                          <option value="proximasAcoes">
                                             Próximas ações
                                          </option>
                                          <option value="emProgresso">
                                             Em progresso
                                          </option>
                                          <option value="pausada">
                                             Pausada
                                          </option>
                                          <option value="aguardando">
                                             Aguardando
                                          </option>
                                          <option value="planejada">
                                             Planejada
                                          </option>
                                          <option value="concluida">
                                             Concluída
                                          </option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="w-full mt-3">
                                    <div className="relative w-full mt-3 h-12 py-4 px-3 border border-indigo-600 hover:border-indigo-300 focus-within:border-black rounded-lg">
                                       <label
                                          htmlFor="status"
                                          className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-md font-semibold text-indigo-900 px-1 bg-indigo-50"
                                       >
                                          Projeto
                                       </label>

                                       <select
                                          id="status"
                                          className="w-full outline-none bg-transparent text-gray-600 placeholder-gray-400 font-semibold"
                                       >
                                          <option value="">
                                             Essa tarefa pertence a algum
                                             projeto?
                                          </option>
                                          {/* TODO fazer o sistema puxar todos os nomes de projetos e listar aqui para escolher */}
                                          <option value="proximasAcoes">
                                             Não pertence a nenhum projeto
                                          </option>
                                          <option value="proximasAcoes">
                                             Projeto 1
                                          </option>
                                          <option value="emProgresso">
                                             Projeto 2
                                          </option>
                                          <option value="pausada">
                                             Projeto 3
                                          </option>
                                       </select>
                                    </div>
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
                                       placeholder="Insira a descrição da nova tarefa"
                                    ></textarea>
                                 </div>
                              </div>
                              <div className=" w-full flex justify-center space-x-5 mt-10">
                                 <button
                                    type="button"
                                    onClick={
                                       modalContent
                                          ? atualizaTarefa
                                          : criaTarefa
                                    }
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 >
                                    Salvar
                                 </button>
                                 <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
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
