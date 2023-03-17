import type { NextPage } from 'next';
import Menu from '../components/parts/Menu';
import TasksSections from '../components/sections/TaskSections';

export default function Progresso<NextPage>() {
   return (
      <TasksSections
         titulo="Tarefas em Andamento"
         subtitulo="Veja aqui todas as tarefas que estão em andamento"
         status="emProgresso"
      />
   );
}

Progresso.auth = true;
