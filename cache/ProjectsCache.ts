import { Dispatch } from 'react';
import IProject from '../interfaces/IProject';
import { ProjectActions } from '../reducer/projectReducer';

export default class TasksCache {
   constructor(
      public projects: IProject[],
      public projectDispatch: Dispatch<ProjectActions> | Function
   ) {}
}
