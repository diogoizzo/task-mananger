import axios from 'axios';
import InboxCache from '../cache/InboxCache';

export default class InboxServices {
   constructor(public inboxCache: InboxCache) {}
   create(title: string | undefined) {
      if (title) {
         axios
            .post('/api/inbox', {
               title: title
            })
            .then((res) => {
               this.inboxCache.create(res.data);
            });
      } else {
         throw new Error('O inbox precisa ter um nome');
      }
   }
   update(id: string | undefined, title: string | undefined) {
      if (id) {
         axios
            .put(`/api/inbox/${id}`, {
               data: {
                  title: title
               }
            })
            .then((res) => {
               this.inboxCache.update(res.data);
            });
      } else {
         throw new Error('O inbox precisa ter um id para ser atualizado');
      }
   }
   delete(id: string) {
      axios.delete(`/api/inbox/${id}`).then((res) => {
         this.inboxCache.delete(res.data);
      });
   }
}
