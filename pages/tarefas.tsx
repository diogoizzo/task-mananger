import TasksSections from '../components/sections/TaskSections';

function Tarefas() {
   return (
      <TasksSections
         titulo="Tarefas"
         subtitulo="Veja aqui todas as suas tarefas"
         status="ativas"
      />
   );
}
Tarefas.auth = true;
export default Tarefas;
