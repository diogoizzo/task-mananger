import ProjectsCache from '../cache/ProjectsCache';
import useProjectFetch from './useProjectFetch';

export default function useTasksCache() {
   const [projects, projectsDispatch] = useProjectFetch();

   return new ProjectsCache(projects, projectsDispatch);
}
