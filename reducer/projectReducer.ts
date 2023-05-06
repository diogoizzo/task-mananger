import Project from '../entities/Project';
import IProject from '../interfaces/IProject';

export enum ProjectActionsTypes {
   addProject = 'addProject',
   removeProject = 'removeProject',
   updateProject = 'updateProject'
}

export interface ProjectActions {
   type: ProjectActionsTypes;
   payload: IProject[];
}

export default function projectReducer(
   state: IProject[],
   action: ProjectActions
) {
   let { type, payload } = action;
   if (payload.length > 1) {
      payload = payload.map<Project>((project: IProject) => {
         return Project.createFromObject(project);
      });
   } else if (payload.length === 1) {
      payload = [Project.createFromObject(payload[0])];
   }
   switch (type) {
      case ProjectActionsTypes.addProject:
         return [...state, ...payload];
      case ProjectActionsTypes.removeProject:
         const [payloadProject] = payload;
         return state.filter((project) => project.id !== payloadProject.id);
      case ProjectActionsTypes.updateProject:
         const [upedatedProject] = payload;
         return state.map((project) => {
            if (project.id === upedatedProject.id) {
               return upedatedProject;
            }
            return project;
         });
   }
}
