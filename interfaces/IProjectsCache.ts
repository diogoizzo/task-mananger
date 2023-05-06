import { Dispatch } from 'react';
import IProject from './IProject';
import { ProjectActions } from '../reducer/projectReducer';
import { ITask } from './ITask';

export default interface IProjectsCache {
   projects: IProject[];
   projectDispatch: Dispatch<ProjectActions> | Function;
   selectByProjectID: (projectId: string) => IProject | undefined;
   includeTaskInProject: (projectId: string, task: ITask) => void;
   removeFromProject: (task: ITask, currentProjectId: string) => void;
   changeProject: (
      projectBeforeAlterationId: string,
      selectedProject: IProject,
      taskIdx: number,
      task: ITask
   ) => void;
   update: (project: IProject) => void;
   create: (project: IProject) => void;
   orderedByLeftTime: IProject[];
   notInitializedProjects: IProject[];
   activeProjects: IProject[];
   completedProjects: IProject[];
}
