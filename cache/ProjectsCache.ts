import { Dispatch } from 'react';
import IProject from '../interfaces/IProject';
import { ProjectActions, ProjectActionsTypes } from '../reducer/projectReducer';
import { ITask } from '../interfaces/ITask';
import IProjectsCache from '../interfaces/IProjectsCache';
import dayjs from 'dayjs';

export default class ProjectsCache implements IProjectsCache {
   constructor(
      public projects: IProject[],
      public projectDispatch: Dispatch<ProjectActions> | Function
   ) {}

   get orderedByLeftTime() {
      return this.projects.sort((a: any, b: any) => a.leftTime - b.leftTime);
   }

   get notInitializedProjects() {
      return this.orderedByLeftTime.filter(
         (project: IProject) =>
            Number(new Date(project.startDate)) > Date.now() &&
            project.dueAt === null
      );
   }

   get activeProjects() {
      return this.orderedByLeftTime.filter(
         (project: IProject) =>
            Number(new Date(project.startDate)) <= Date.now() &&
            project.dueAt === null
      );
   }

   get completedProjects() {
      return this.orderedByLeftTime.filter(
         (project: IProject) => project.dueAt !== null
      );
   }

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
                  tasks:
                     selectedProject?.tasks?.length > 0
                        ? [...selectedProject?.tasks, task]
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
            tasks: [
               ...projectBeforeAlteration.tasks.filter(
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
      selectedProject?.tasks.splice(taskIdx, 1);
      if (selectedProject) {
         this.projectDispatch({
            type: ProjectActionsTypes.updateProject,
            payload: [
               {
                  ...selectedProject,
                  tasks: [...selectedProject.tasks, task]
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
   update(project: IProject) {
      this.projectDispatch({
         type: ProjectActionsTypes.updateProject,
         payload: [project]
      });
   }
   create(project: IProject) {
      this.projectDispatch({
         type: ProjectActionsTypes.addProject,
         payload: [project]
      });
   }
}
