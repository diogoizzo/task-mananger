import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { Portal } from 'react-portal';
import { useInboxDispatch } from '../../context/GlobalContext';
import { InboxActionsTypes } from '../../reducer/inboxReducer';

interface InboxModalProps {
   isOpen: boolean;
   closeModal: any;
   update?: boolean;
   content?: string;
   id?: string;
}

export default function InboxModal({
   isOpen,
   closeModal,
   update,
   content,
   id
}: InboxModalProps) {
   const [title, setTitle] = useState(content ?? '');
   const dispatch = useInboxDispatch();

   function criaInbox() {
      axios
         .post('/api/inbox', {
            title: title
         })
         .then((res) => {
            dispatch({
               type: InboxActionsTypes.addTask,
               payload: [res.data]
            });
            setTitle('');
            closeModal();
         });
   }

   function updateInbox() {
      axios
         .put(`/api/inbox/${id}`, {
            data: {
               title: title
            }
         })
         .then((res) => {
            dispatch({
               type: InboxActionsTypes.updateTask,
               payload: [res.data]
            });
         });

      closeModal();
   }

   return (
      <Portal>
         <Transition show={isOpen} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-10 "
               onClose={() => {
                  setTitle('');
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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-2xl font-medium text-center leading-6 text-indigo-900"
                           >
                              Nova tarefa
                           </Dialog.Title>
                           <div className="mt-5">
                              <p className="text-sm text-justify text-gray-600">
                                 Digite um resumo do que precisa ser feito. Não
                                 se preocupe com os detalhes, eles serão
                                 elaborados quando a tarefa for processada
                              </p>
                              <div className="w-full text-center mt-8">
                                 <textarea
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border border-indigo-200 rounded-lg p-3 text-justify"
                                    name="tarefa"
                                    id="tarefa"
                                    cols={40}
                                    rows={7}
                                 ></textarea>
                              </div>
                           </div>

                           <div className="mt-4 w-full flex justify-center space-x-5">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={update ? updateInbox : criaInbox}
                              >
                                 Salvar
                              </button>
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => {
                                    setTitle('');
                                    closeModal();
                                 }}
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
