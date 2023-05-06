import axios from 'axios';
import IProjectService from '../interfaces/IProjectServices';
import IProjectsCache from '../interfaces/IProjectsCache';
import IProject from '../interfaces/IProject';

export default class ProjectServices implements IProjectService {
   constructor(public projectsCache: IProjectsCache) {}

   async create(formData: object): Promise<IProject | void> {
      return axios.post('/api/projects', formData).then((res) => {
         this.projectsCache.create(res.data);
         return res.data.id;
      });
   }
   async update(id: string, formData: object) {
      return axios.put(`/api/projects/${id}`, formData).then((res) => {
         this.projectsCache.update(res.data);
         return res.data.id;
      });
   }
}
