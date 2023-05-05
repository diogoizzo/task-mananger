import IProjectsCache from './IProjectsCache';
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
}
