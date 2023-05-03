import ProjectsCache from '../cache/ProjectsCache';
import TasksCache from '../cache/TasksCache';
import {
   useProjectContext,
   useProjectDispatch,
   useTasksContext,
   useTasksDispatch
} from '../context/GlobalContext';
import TaskServices from '../services/TaskServices';

export default function useTaskServices() {
   const tasks = useTasksContext();
   const tasksDispatch = useTasksDispatch();
   const projects = useProjectContext();
   const projectDispatch = useProjectDispatch();
   return new TaskServices(
      new TasksCache(tasks, tasksDispatch),
      new ProjectsCache(projects, projectDispatch)
   );
}
