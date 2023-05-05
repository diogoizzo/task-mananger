import { Dispatch } from 'react';
import { ITask } from '../interfaces/ITask';
import { TasksActions, TasksActionsTypes } from '../reducer/tasksReducer';
import dayjs from 'dayjs';
import ITasksCache from '../interfaces/ITasksCache';

export default class TasksCache implements ITasksCache {
   constructor(
      public tasks: ITask[],
      public tasksDispatch: Dispatch<TasksActions> | Function
   ) {}
   get activeTasks() {
      return this.tasks.filter((task) => task.status !== 'concluida');
   }
   get delayedTasks() {
      return this.tasks.filter(
         (task) =>
            dayjs(task?.dueDate).diff(dayjs(), 'day') < 0 &&
            task.status !== 'concluida'
      );
   }

   filterByStatus(status: string) {
      return this.tasks.filter((task) => task.status === status);
   }

   orderByStatus(status: string) {
      let filteredTasks;

      if (status === 'ativas') {
         filteredTasks = this.activeTasks;
      } else if (status === 'atrasadas') {
         filteredTasks = this.delayedTasks;
      } else {
         filteredTasks = this.filterByStatus(status);
      }

      const orderedTasks =
         status === 'ativas' || status === 'proximasAcoes'
            ? filteredTasks.sort(
                 (a: any, b: any) => Number(a.leftTime) - Number(b.leftTime)
              )
            : filteredTasks.sort(
                 (a: any, b: any) =>
                    Number(new Date(b.dueAt)) - Number(new Date(a.dueAt))
              );
      return orderedTasks;
   }
   create(task: ITask) {
      this.tasksDispatch({
         type: TasksActionsTypes.addTask,
         payload: [task]
      });
   }
   update(task: ITask) {
      this.tasksDispatch({
         type: TasksActionsTypes.updateTask,
         payload: [task]
      });
   }
}
