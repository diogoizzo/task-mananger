import TasksCache from '../cache/TasksCache';
import useTaskFetch from './useTaskFetch';

export default function useTasksCache() {
   const [tasks, tasksDispatch] = useTaskFetch();

   return new TasksCache(tasks, tasksDispatch);
}
