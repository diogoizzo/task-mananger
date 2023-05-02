import axios from 'axios';
import InboxCache from '../cache/InboxCache';
import { IInboxTask } from '../interfaces/IInboxTask';
import { InboxActions } from '../reducer/inboxReducer';

export default class InboxServices extends InboxCache {
   constructor(
      public inbox: IInboxTask[],
      public inboxDispatch: React.Dispatch<InboxActions> | Function
   ) {
      super(inbox, inboxDispatch);
   }
   createInbox(title: string | undefined) {
      if (title) {
         axios
            .post('/api/inbox', {
               title: title
            })
            .then((res) => {
               super.create(res.data);
            });
      } else {
         throw new Error('O inbox precisa ter um nome');
      }
   }
   updateInbox(id: string | undefined, title: string | undefined) {
      if (id) {
         axios
            .put(`/api/inbox/${id}`, {
               data: {
                  title: title
               }
            })
            .then((res) => {
               super.update(res.data);
            });
      } else {
         throw new Error('O inbox precisa ter um id para ser atualizado');
      }
   }
   deleteInbox(id: string) {
      axios.delete(`/api/inbox/${id}`).then((res) => {
         super.delete(res.data);
      });
   }
}
