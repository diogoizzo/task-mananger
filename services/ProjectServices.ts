import IProjectService from '../interfaces/IProjectServices';
import IProjectsCache from '../interfaces/IProjectsCache';

export default class ProjectServices implements IProjectService {
   constructor(public projectsCache: IProjectsCache) {}
}
