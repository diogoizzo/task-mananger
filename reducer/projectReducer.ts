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
   const { type, payload } = action;
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
