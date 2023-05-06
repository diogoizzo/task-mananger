import { ITask } from './../interfaces/ITask';
export default function filterAndOrderTask(
   tasks: ITask[],
   status: string
): ITask[] {
   const orderedTasks =
      status === 'ativas' || status === 'proximasAcoes'
         ? tasks
              .filter((task) => task.status !== 'concluida')
              .sort((a: any, b: any) => Number(a.leftTime) - Number(b.leftTime))
         : tasks
              .filter((task) => task.status === 'concluida')
              .sort(
                 (a: any, b: any) =>
                    Number(new Date(b.dueAt)) - Number(new Date(a.dueAt))
              );
   return orderedTasks;
}
