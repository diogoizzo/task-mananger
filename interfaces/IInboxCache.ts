import { InboxActions } from '../reducer/inboxReducer';
import { IInboxTask } from './IInboxTask';

export default interface IInboxCache {
   inbox: IInboxTask[];
   inboxDispatch: React.Dispatch<InboxActions> | Function;
   create: (inbox: IInboxTask) => void;
   update: (inbox: IInboxTask) => void;
   delete: (inbox: IInboxTask) => void;
   mapedTasks: { id: string; title: string }[];
}
