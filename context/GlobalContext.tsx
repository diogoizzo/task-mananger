import React, { ReactNode, useContext, useReducer, Dispatch } from 'react';
import { IInboxTask } from '../interfaces/IInboxTask';
import { ITask } from '../interfaces/ITask';
import inboxReducer from '../reducer/inboxReducer';
import { InboxActions } from '../reducer/inboxReducer';
import tasksReducer, { TasksActions } from '../reducer/tasksReducer';
import projectReducer from '../reducer/projectReducer';
import { ProjectActions } from '../reducer/projectReducer';
import IProject from '../interfaces/IProject';

interface GlobalContextProviderProps {
   children: ReactNode;
}

const ProjectContext = React.createContext<IProject[]>([]);
const ProjectDispatchContext = React.createContext<
   React.Dispatch<ProjectActions> | Function
>(() => {});

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

export function useProjectContext() {
   return useContext(ProjectContext);
}

export function useProjectDispatch() {
   return useContext(ProjectDispatchContext);
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
   const [projectState, projectDispatch] = useReducer(projectReducer, []);
   return (
      <InboxDispatchContext.Provider value={inboxDispatch}>
         <InboxContext.Provider value={inboxState}>
            <TasksDispatchContext.Provider value={tasksDispatch}>
               <TasksContext.Provider value={tasksState}>
                  <ProjectDispatchContext.Provider value={projectDispatch}>
                     <ProjectContext.Provider value={projectState}>
                        {children}
                     </ProjectContext.Provider>
                  </ProjectDispatchContext.Provider>
               </TasksContext.Provider>
            </TasksDispatchContext.Provider>
         </InboxContext.Provider>
      </InboxDispatchContext.Provider>
   );
}
