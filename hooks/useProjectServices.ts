import ProjectServices from '../services/ProjectServices';
import useProjectsCache from './useProjectCache';

export default function useProjectService() {
   const projectCache = useProjectsCache();
   return new ProjectServices(projectCache);
}
