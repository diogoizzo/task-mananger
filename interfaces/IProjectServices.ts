import IProject from './IProject';
import IProjectsCache from './IProjectsCache';

export default interface IProjectService {
   projectsCache: IProjectsCache;
   create: (formData: object) => Promise<IProject | void>;
   update: (id: string, formData: object) => Promise<IProject | void>;
}
