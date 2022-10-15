import { IInboxTask } from '../interfaces/IInboxTask';

export enum InboxActionsTypes {
   addTask = 'addTask',
   removeTask = 'removeTask',
   updateTask = 'updateTask'
}

export interface InboxActions {
   type: InboxActionsTypes;
   payload: IInboxTask[];
}

export default function inboxReducer(
   state: IInboxTask[],
   action: InboxActions
) {
   const { type, payload } = action;
   switch (type) {
      case InboxActionsTypes.addTask:
         return [...state, ...payload];
      case InboxActionsTypes.removeTask:
         const [payloadTask] = payload;
         return state.filter((task) => task.id !== payloadTask.id);
      case InboxActionsTypes.updateTask:
         const [upedatedTask] = payload;
         return state.map((task) => {
            if (task.id === upedatedTask.id) {
               return upedatedTask;
            }
            return task;
         });
   }
}
