import axios from 'axios';
import ProjectsCache from '../cache/ProjectsCache';
import TasksCache from '../cache/TasksCache';
import rightProjectAndTaskIdx from '../utils/rightProjectAndTaskIdx';

export default class TaskServices {
   constructor(
      public tasksCache: TasksCache,
      public projectsCache: ProjectsCache
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
