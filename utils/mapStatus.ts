import { ITask } from '../interfaces/ITask';

export default function mapStatus(task: ITask) {
   switch (task.status) {
      case 'proximasAcoes':
         return 'Próximas Ações';
      case 'emProgresso':
         return 'Em andamento';
      case 'concluida':
         return 'Concluída';
      default:
         return task.status;
   }
}
