import { Dispatch } from 'react';
import { ITask } from './ITask';
import { TasksActions } from '../reducer/tasksReducer';

export default interface ITasksCache {
   tasks: ITask[];
   tasksDispatch: Dispatch<TasksActions> | Function;
   activeTasks: ITask[];
   delayedTasks: ITask[];
   filterByStatus: (status: string) => ITask[];
   orderByStatus: (status: string) => ITask[];
   create: (task: ITask) => void;
   update: (task: ITask) => void;
}
