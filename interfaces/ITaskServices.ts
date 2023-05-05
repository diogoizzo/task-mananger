import IProjectsCache from './IProjectsCache';
import { ITask } from './ITask';
import ITasksCache from './ITasksCache';

export default interface ITaskServices {
   tasksCache: ITasksCache;
   projectsCache: IProjectsCache;
   create: (formData: object) => void;
   update: (
      currentId: string,
      modalContentId: string,
      formData: object
   ) => void;
   complete: (id: string) => void;
   findFreeTask: (task: ITask) => void;
   changeStatus: (task: ITask, status: string) => void;
}
