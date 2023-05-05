import axios from 'axios';
import rightProjectAndTaskIdx from '../utils/rightProjectAndTaskIdx';
import ITasksCache from '../interfaces/ITasksCache';
import IProjectsCache from '../interfaces/IProjectsCache';
import ITaskServices from '../interfaces/ITaskServices';
import { ITask } from '../interfaces/ITask';

export default class TaskServices implements ITaskServices {
   constructor(
      public tasksCache: ITasksCache,
      public projectsCache: IProjectsCache
   ) {}

   create(formData: object) {
      axios.post('/api/tasks', formData).then((res) => {
         this.tasksCache.create(res.data);
         this.projectsCache.includeTaskInProject(res.data.projetoId, res.data);
      });
   }
   update(currentId: string, modalContentId: string, formData: object) {
      if (modalContentId) {
         axios.put(`/api/tasks/${modalContentId}`, formData).then((res) => {
            this.tasksCache.update(res.data);
            const [selectedProject, taskIdx] = rightProjectAndTaskIdx(
               this.projectsCache.projects,
               res.data
            );
            this.projectsCache.changeProject(
               currentId,
               selectedProject,
               taskIdx,
               res.data
            );
         });
      }
   }
   delete(id: string) {
      axios.delete(`/api/tasks/${id}`).then((res) => {
         this.tasksCache.delete(res.data);
         const [rigthProject, taskIdx] = rightProjectAndTaskIdx(
            this.projectsCache.projects,
            res.data
         );
         rigthProject.tarefas.splice(taskIdx, 1);
         this.projectsCache.update(rigthProject);
      });
   }

   changeStatus(task: ITask, status: string) {
      axios
         .patch(`/api/tasks/${task.id}`, {
            status: status
         })
         .then((res) => {
            this.tasksCache.update(res.data);
            const [rigthProject, taskIdx] = rightProjectAndTaskIdx(
               this.projectsCache.projects,
               res.data
            );
            if (rigthProject) {
               rigthProject.tarefas[taskIdx] = res.data;
               this.projectsCache.update(rigthProject);
            }
         });
   }

   findFreeTask(task: ITask) {
      task.isDependencyOf &&
         task.isDependencyOf.forEach((dependentTask: ITask) => {
            const countActiveDependencies = dependentTask?.dependencies.reduce(
               (acc: number, taskDepedency: ITask) => {
                  return taskDepedency.status !== 'concluida' ? acc + 1 : acc;
               },
               0
            );
            if (countActiveDependencies === 0) {
               this.changeStatus(dependentTask, 'proximasAcoes');
            }
         });
   }
   complete(id: string) {
      axios.patch(`/api/tasks/${id}`).then((res) => {
         this.tasksCache.update(res.data);
         const [rigthProject, taskIdx] = rightProjectAndTaskIdx(
            this.projectsCache.projects,
            res.data
         );
         if (rigthProject) {
            rigthProject.tarefas[taskIdx] = res.data;
            this.projectsCache.update(rigthProject);
         }
         this.findFreeTask(res.data);
      });
   }
}
