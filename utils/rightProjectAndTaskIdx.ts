import IProject from '../interfaces/IProject';
import { ITask } from '../interfaces/ITask';

export default function rightProjectAndTaskIdx(
   projects: IProject[],
   task: ITask
): [IProject, number] {
   const projectIdx = projects.findIndex(
      (project) => project.id === task.projectId
   );
   const taskIdx = projects[projectIdx]?.tasks.findIndex(
      (item) => item.id === task.id
   );
   return [projects[projectIdx], taskIdx];
}
