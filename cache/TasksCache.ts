import { Dispatch } from 'react';
import { ITask } from '../interfaces/ITask';
import { TasksActions } from '../reducer/tasksReducer';

export default class TasksCache {
   constructor(
      public tasks: ITask[],
      public tasksDispatch: Dispatch<TasksActions> | Function
   ) {}
}
