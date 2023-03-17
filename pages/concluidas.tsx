import type { NextPage } from 'next';
import TasksSections from '../components/sections/TaskSections';

export default function Concluidas<NextPage>() {
   return (
      <TasksSections
         titulo="Tarefas Concluídas"
         subtitulo="Veja aqui todas as tarefas que já foram concluídas"
         status="concluida"
      />
   );
   {
      /* TODO Alterar card de tarefas para não aparecer o tempo restante, já que a tarefa já foi concluída*/
   }
}

Concluidas.auth = true;
