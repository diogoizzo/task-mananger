import { useEffect } from 'react';
import { useTasksContext, useTasksDispatch } from '../context/GlobalContext';
import axios from 'axios';
import { TasksActionsTypes } from '../reducer/tasksReducer';
import { ITask } from '../interfaces/ITask';

export default function useTaskFetch(): [ITask[], Function] {
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
   }, [dispatch, tasks]);
   return [tasks, dispatch];
}
