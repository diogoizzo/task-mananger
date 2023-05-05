import { Dispatch } from 'react';
import IProject from '../interfaces/IProject';
import { ProjectActions, ProjectActionsTypes } from '../reducer/projectReducer';
import { ITask } from '../interfaces/ITask';
import IProjectsCache from '../interfaces/IProjectsCache';

export default class ProjectsCache implements IProjectsCache {
   constructor(
      public projects: IProject[],
      public projectDispatch: Dispatch<ProjectActions> | Function
   ) {}

   selectByProjectID(projectId: string) {
      return this.projects.find((project) => project.id === projectId);
   }
   includeTaskInProject(projectId: string, task: ITask) {
      const selectedProject = this.selectByProjectID(projectId);
      if (selectedProject) {
         this.projectDispatch({
            type: ProjectActionsTypes.updateProject,
            payload: [
               {
                  ...selectedProject,
                  tarefas:
                     selectedProject?.tarefas?.length > 0
                        ? [...selectedProject?.tarefas, task]
                        : [task]
               }
            ]
         });
      }
   }

   removeFromProject(task: ITask, currentProjectId: string) {
      const projectBeforeAlteration = this.selectByProjectID(currentProjectId);
      if (projectBeforeAlteration) {
         const alteredProject = {
            ...projectBeforeAlteration,
            tarefas: [
               ...projectBeforeAlteration.tarefas.filter(
                  (tarefa) => tarefa.id !== task.id
               )
            ]
         };
         this.projectDispatch({
            type: ProjectActionsTypes.updateProject,
            payload: [alteredProject]
         });
      }
   }
   changeProject(
      projectBeforeAlterationId: string,
      selectedProject: IProject,
      taskIdx: number,
      task: ITask
   ) {
      selectedProject?.tarefas.splice(taskIdx, 1);
      if (selectedProject) {
         this.projectDispatch({
            type: ProjectActionsTypes.updateProject,
            payload: [
               {
                  ...selectedProject,
                  tarefas: [...selectedProject.tarefas, task]
               }
            ]
         });
         if (selectedProject.id !== projectBeforeAlterationId) {
            this.removeFromProject(task, projectBeforeAlterationId);
         }
      } else {
         this.removeFromProject(task, projectBeforeAlterationId);
      }
   }
}
