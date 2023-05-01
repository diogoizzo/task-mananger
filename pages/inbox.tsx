import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import BtnTarefaInbox from '../components/atoms/BtnAdd';
import PageTitle from '../components/atoms/PageTitle';
import Paragrafo from '../components/atoms/Paragrafo';
import TableBody from '../components/atoms/TableBody';
import TableHead from '../components/atoms/TableHead';
import InboxModal from '../components/modals/InboxModal';
import Menu from '../components/parts/Menu';
import { useInboxContext, useInboxDispatch } from '../context/GlobalContext';
import { InboxActionsTypes } from '../reducer/inboxReducer';
import axios from 'axios';

export default function Inbox<NextPage>() {
   const [isOpen, setIsOpen] = useState(false);
   const inboxTasks = useInboxContext();
   const dispatch = useInboxDispatch();

   useEffect(() => {
      const controller = new AbortController();
      if (!inboxTasks.length) {
         axios
            .get('/api/inbox', { signal: controller.signal })
            .then((res) => {
               dispatch({
                  type: InboxActionsTypes.addTask,
                  payload: res.data
               });
            })
            .catch((error) => {
               console.log(error);
            });
         return () => {
            controller.abort();
         };
      }
   }, [dispatch, inboxTasks]);

   const mapTasks = inboxTasks.map((task) => {
      return {
         id: task.id,
         title: task.title
      };
   });

   function closeModal() {
      setIsOpen(false);
   }

   function openModal() {
      setIsOpen(true);
   }

   return (
      <Menu>
         <InboxModal isOpen={isOpen} closeModal={closeModal} />
         <section className="bg-white p-8 text-indigo-900 sticky top-0 z-20 shadow-md">
            <div className="flex flex-wrap items-center -m-2">
               <div className="w-full md:w-1/2 p-2">
                  <PageTitle title="Inbox" />
                  <Paragrafo>
                     Cadastre rapidamente as tarefas para depois processá-las
                  </Paragrafo>
               </div>
               <div className="w-full md:w-1/2 p-2">
                  <div className="flex flex-wrap justify-end -m-2">
                     <div className="w-full md:w-auto p-2">
                        <BtnTarefaInbox onClick={openModal} text="Adicionar" />
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <div className="w-full h-px bg-slate-200"></div>
         <section>
            <div className=" flex items-center justify-center  font-sans overflow-y-auto">
               <div className="w-full px-8">
                  <div className="bg-white shadow-md my-6 ">
                     <table className="w-full table-auto  rounded-lg text-indigo-900">
                        <TableHead heads={['título', 'Ações']} />
                        <TableBody tasks={mapTasks} />
                     </table>
                  </div>
               </div>
            </div>
         </section>
      </Menu>
   );
}

Inbox.auth = true;
