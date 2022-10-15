import React, { ReactNode, useContext, useReducer } from 'react';
import { IInboxTask } from '../interfaces/IInboxTask';
import inboxReducer from '../reducer/inboxReducer';
import { InboxActions } from '../reducer/inboxReducer';

interface GlobalContextProviderProps {
   children: ReactNode;
}

const InboxContext = React.createContext<IInboxTask[]>([]);
const InboxDispatchContext = React.createContext<
   React.Dispatch<InboxActions> | Function
>(() => {});

export function useInboxContext() {
   return useContext(InboxContext);
}

export function useInboxDispatch() {
   return useContext(InboxDispatchContext);
}

export default function GlobalContext({
   children
}: GlobalContextProviderProps) {
   const [inboxState, inboxDispatch] = useReducer(inboxReducer, []);
   return (
      <InboxDispatchContext.Provider value={inboxDispatch}>
         <InboxContext.Provider value={inboxState}>
            {children}
         </InboxContext.Provider>
      </InboxDispatchContext.Provider>
   );
}
