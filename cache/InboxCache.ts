import { InboxActions } from './../reducer/inboxReducer';
import { IInboxTask } from '../interfaces/IInboxTask';
import { InboxActionsTypes } from '../reducer/inboxReducer';

export default class InboxCache {
   constructor(
      public inbox: IInboxTask[],
      public inboxDispatch: React.Dispatch<InboxActions> | Function
   ) {}

   create(inbox: IInboxTask) {
      this.inboxDispatch({
         type: InboxActionsTypes.addTask,
         payload: [inbox]
      });
   }

   update(inbox: IInboxTask) {
      this.inboxDispatch({
         type: InboxActionsTypes.updateTask,
         payload: [inbox]
      });
   }

   delete(inbox: IInboxTask) {
      this.inboxDispatch({
         type: InboxActionsTypes.removeTask,
         payload: [inbox]
      });
   }

   get mapedTasks() {
      return this.inbox.map((task) => {
         return {
            id: task.id,
            title: task.title
         };
      });
   }
}
