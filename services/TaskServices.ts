import axios from 'axios';
import rightProjectAndTaskIdx from '../utils/rightProjectAndTaskIdx';
import ITasksCache from '../interfaces/ITasksCache';
import IProjectsCache from '../interfaces/IProjectsCache';
import ITaskServices from '../interfaces/ITaskServices';

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
}
