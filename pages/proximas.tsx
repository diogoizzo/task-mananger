import type { NextPage } from 'next';
import Menu from '../components/parts/Menu';
import TasksSections from '../components/sections/TaskSections';

export default function Proximas<NextPage>() {
   return (
      <TasksSections
         titulo="Próximas ações"
         subtitulo="Veja aqui todas as tarefas que já podem ser realizadas"
         status="proximasAcoes"
      />
   );
}

Proximas.auth = true;
