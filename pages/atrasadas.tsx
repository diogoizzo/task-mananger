import type { NextPage } from 'next';
import Menu from '../components/parts/Menu';
import TasksSections from '../components/sections/TaskSections';

export default function Progresso<NextPage>() {
   return (
      <TasksSections
         titulo="Tarefas atrasadas"
         subtitulo="Veja aqui todas as tarefas que estão atrasadas."
         status="atrasadas"
      />
   );
}

Progresso.auth = true;
