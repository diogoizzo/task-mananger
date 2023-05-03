import ProjectsCache from '../cache/ProjectsCache';
import {
   useProjectContext,
   useProjectDispatch
} from '../context/GlobalContext';

export default function useProjectsCache() {
   const projects = useProjectContext();
   const projectsDispatch = useProjectDispatch();

   return new ProjectsCache(projects, projectsDispatch);
}
