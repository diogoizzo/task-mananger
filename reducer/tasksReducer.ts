import Task from '../entities/Task';
import { ITask } from './../interfaces/ITask';

export enum TasksActionsTypes {
   log = 'log',
   addTask = 'addTask',
   removeTask = 'removeTask',
   updateTask = 'updateTask'
}

export interface TasksActions {
   type: TasksActionsTypes;
   payload: ITask[];
}

export default function inboxReducer(
   state: ITask[],
   action: TasksActions
): ITask[] {
   let { type, payload } = action;
   if (payload.length > 1) {
      payload = payload.map<Task>((task) => {
         const {
            id,
            startDate,
            dueDate,
            title,
            description,
            status,
            dependencies,
            createdAt,
            dueAt,
            projetoId,
            isDependencyOf
         } = task;
         return new Task(
            id,
            startDate,
            dueDate,
            title,
            description,
            status,
            dependencies,
            createdAt,
            dueAt,
            projetoId,
            isDependencyOf
         );
      });
   } else {
      const {
         id,
         startDate,
         dueDate,
         title,
         description,
         status,
         dependencies,
         createdAt,
         dueAt,
         projetoId,
         isDependencyOf
      } = payload[0];
      payload = [
         new Task(
            id,
            startDate,
            dueDate,
            title,
            description,
            status,
            dependencies,
            createdAt,
            dueAt,
            projetoId,
            isDependencyOf
         )
      ];
   }
   switch (type) {
      case TasksActionsTypes.addTask:
         return [...state, ...payload];
      case TasksActionsTypes.removeTask:
         const [payloadTask] = payload;
         return state.filter((task) => task.id !== payloadTask.id);
      case TasksActionsTypes.updateTask:
         const [upedatedTask] = payload;
         return state.map((task) => {
            if (task.id === upedatedTask.id) {
               return upedatedTask;
            }
            return task;
         });
      default:
         return state;
   }
}
