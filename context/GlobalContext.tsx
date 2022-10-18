import React, { ReactNode, useContext, useReducer } from 'react';
import { IInboxTask } from '../interfaces/IInboxTask';
import { ITask } from '../interfaces/ITask';
import inboxReducer from '../reducer/inboxReducer';
import { InboxActions } from '../reducer/inboxReducer';
import tasksReducer, { TasksActions } from '../reducer/tasksReducer';

interface GlobalContextProviderProps {
   children: ReactNode;
}

const InboxContext = React.createContext<IInboxTask[]>([]);
const InboxDispatchContext = React.createContext<
   React.Dispatch<InboxActions> | Function
>(() => {});

const TasksContext = React.createContext<ITask[]>([]);
const TasksDispatchContext = React.createContext<
   React.Dispatch<TasksActions> | Function
>(() => {});

export function useInboxContext() {
   return useContext(InboxContext);
}

export function useInboxDispatch() {
   return useContext(InboxDispatchContext);
}

export function useTasksContext() {
   return useContext(TasksContext);
}

export function useTasksDispatch() {
   return useContext(TasksDispatchContext);
}

export default function GlobalContext({
   children
}: GlobalContextProviderProps) {
   const [inboxState, inboxDispatch] = useReducer(inboxReducer, []);
   const [tasksState, tasksDispatch] = useReducer(tasksReducer, []);
   return (
      <InboxDispatchContext.Provider value={inboxDispatch}>
         <InboxContext.Provider value={inboxState}>
            <TasksDispatchContext.Provider value={tasksDispatch}>
               <TasksContext.Provider value={tasksState}>
                  {children}
               </TasksContext.Provider>
            </TasksDispatchContext.Provider>
         </InboxContext.Provider>
      </InboxDispatchContext.Provider>
   );
}
