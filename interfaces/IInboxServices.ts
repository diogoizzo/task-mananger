import IInboxCache from './IInboxCache';

export default interface IInboxServices {
   inboxCache: IInboxCache;
   create: (title: string | undefined) => void;
   update: (id: string | undefined, title: string | undefined) => void;
   delete: (id: string) => void;
}
