import axios from 'axios';
import { useState } from 'react';
import { useInboxDispatch } from '../../context/GlobalContext';
import { InboxActionsTypes } from '../../reducer/inboxReducer';
import InboxModal from '../modals/InboxModal';

interface ITaskInbox {
   id: string;
   title: string;
}

interface TableRowsProps {
   task: ITaskInbox;
}

export default function TableRow({ task }: TableRowsProps) {
   const dispatch = useInboxDispatch();
   const [isOpen, setIsOpen] = useState(false);

   function deleteInbox() {
      axios.delete(`/api/inbox/${task.id}`).then((res) => {
         dispatch({ type: InboxActionsTypes.removeTask, payload: [res.data] });
      });
   }
   function closeModal() {
      setIsOpen(false);
   }

   function openModal() {
      setIsOpen(true);
   }
   return (
      <tr className="border-b border-gray-200 hover:bg-indigo-50">
         <InboxModal
            isOpen={isOpen}
            closeModal={closeModal}
            content={task.title}
            update
            id={task.id}
         />
         <td className="py-3 px-6 text-justify whitespace-pre-wrap max-w-sm">
            <div className="flex items-center flex-wrap">{task.title}</div>
         </td>

         <td className="py-3 px-6 ">
            <div className="flex item-center justify-end">
               <div
                  onClick={openModal}
                  className="w-5 mr-2 transform hover:text-indigo-500 hover:scale-125 transition-transform"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                     />
                  </svg>
               </div>
               <div
                  onClick={deleteInbox}
                  className="w-5 mr-2 transform hover:text-indigo-500 hover:scale-125 transition-transform"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                     />
                  </svg>
               </div>
               <div className="w-5  transform fill-indigo-900 hover:fill-indigo-500 hover:scale-125 transition-transform">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 576 512"
                     stroke="currentColor"
                  >
                     <path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                  </svg>
               </div>
            </div>
         </td>
      </tr>
   );
}
