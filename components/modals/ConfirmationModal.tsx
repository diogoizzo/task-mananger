import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Portal } from 'react-portal';

interface ConfirmationModalProps {
   isOpen: boolean;
   closeModal: () => void;
   confirmationContent: string;
}

function ConfirmationModal({
   isOpen,
   closeModal,
   confirmationContent
}: ConfirmationModalProps) {
   const router = useRouter();
   return (
      <Portal>
         <Transition show={isOpen} as={Fragment}>
            <Dialog
               as="div"
               className="relative z-30 "
               onClose={() => {
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
                        <Dialog.Panel className="w-full border border-indigo-300  max-w-md transform overflow-hidden rounded-xl bg-indigo-50 p-8 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title
                              as="h3"
                              className="text-2xl font-bold text-center leading-6 text-indigo-900"
                           >
                              Essa tarefa pode ser realizada com uma única ação?
                           </Dialog.Title>
                           <div className="text-center py-10 text-indigo-800">
                              {confirmationContent}
                           </div>
                           <div className=" w-full flex justify-center space-x-5">
                              <button
                                 type="button"
                                 className="inline-flex border-indigo-200  justify-center rounded-md border  bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => {
                                    router.push(
                                       {
                                          pathname: '/tarefas',
                                          query: { text: confirmationContent }
                                       },
                                       '/tarefas'
                                    );
                                 }}
                              >
                                 Sim
                              </button>
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-indigo-200 bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => {
                                    router.push(
                                       {
                                          pathname: '/projetos',
                                          query: { text: confirmationContent }
                                       },
                                       '/projetos'
                                    );
                                 }}
                              >
                                 Não
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
export default ConfirmationModal;
