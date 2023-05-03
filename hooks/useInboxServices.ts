import InboxCache from '../cache/InboxCache';
import { useInboxContext, useInboxDispatch } from '../context/GlobalContext';
import InboxServices from '../services/InboxServices';

export default function useInboxServices() {
   const inbox = useInboxContext();
   const dispatch = useInboxDispatch();
   return new InboxServices(new InboxCache(inbox, dispatch));
}
