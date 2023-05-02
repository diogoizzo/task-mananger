import { useEffect } from 'react';
import { useInboxContext, useInboxDispatch } from '../context/GlobalContext';
import axios from 'axios';
import { InboxActionsTypes } from '../reducer/inboxReducer';
import InboxCache from '../cache/InboxCache';

export default function useInboxFetch(): InboxCache {
   const inboxTasks = useInboxContext();
   const dispatch = useInboxDispatch();

   useEffect(() => {
      const controller = new AbortController();
      if (!inboxTasks.length) {
         axios
            .get('/api/inbox', { signal: controller.signal })
            .then((res) => {
               dispatch({
                  type: InboxActionsTypes.addTask,
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
   }, [dispatch, inboxTasks]);
   return new InboxCache(inboxTasks, dispatch);
}
