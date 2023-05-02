import BtnTarefaInbox from '../components/atoms/BtnAdd';
import PageTitle from '../components/atoms/PageTitle';
import Paragrafo from '../components/atoms/Paragrafo';
import TableBody from '../components/atoms/TableBody';
import TableHead from '../components/atoms/TableHead';
import InboxModal from '../components/modals/InboxModal';
import Menu from '../components/parts/Menu';
import { useState } from 'react';
import useInboxFetch from '../hooks/useInboxFetch';

export default function Inbox<NextPage>() {
   const [isOpen, setIsOpen] = useState(false);
   const inboxCache = useInboxFetch();

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
                        <TableBody tasks={inboxCache.mapedTasks} />
                     </table>
                  </div>
               </div>
            </div>
         </section>
      </Menu>
   );
}

Inbox.auth = true;
