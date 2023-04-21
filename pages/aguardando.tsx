import TasksSections from '../components/sections/TaskSections';
import useTaskFetch from '../hooks/useTaskFetch';

export default function Aguardando<NextPage>() {
   return (
      <TasksSections
         titulo="Tarefas Aguardando"
         subtitulo="Veja aqui todas as terfas que estão aguardando retorno"
         status="aguardando"
      />
   );
}

Aguardando.auth = true;
