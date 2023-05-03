import { useEffect } from 'react';
import { useTasksContext, useTasksDispatch } from '../context/GlobalContext';
import axios from 'axios';
import { TasksActionsTypes } from '../reducer/tasksReducer';
import TasksCache from '../cache/TasksCache';

export default function useTaskFetch(): TasksCache {
   const tasks = useTasksContext();
   const dispatch = useTasksDispatch();
   useEffect(() => {
      const controller = new AbortController();
      if (!tasks.length) {
         axios
            .get('/api/tasks', { signal: controller.signal })
            .then((res) => {
               dispatch({
                  type: TasksActionsTypes.addTask,
                  payload: res.data
               });
            })
            .catch((error) => {
               console.log(error);
            });
         return () => {
            controller.abort();
         };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return new TasksCache(tasks, dispatch);
}
