import { useEffect } from 'react';
import {
   useProjectContext,
   useProjectDispatch
} from '../context/GlobalContext';
import axios from 'axios';
import { ProjectActionsTypes } from '../reducer/projectReducer';
import IProject from '../interfaces/IProject';

export default function useProjectFetch(): [IProject[], Function] {
   const projects: IProject[] = useProjectContext();
   const projectDispatch: Function = useProjectDispatch();

   useEffect(() => {
      const controller = new AbortController();
      if (!projects.length) {
         axios
            .get('/api/projects', { signal: controller.signal })
            .then((res) => {
               projectDispatch({
                  type: ProjectActionsTypes.addProject,
                  payload: res.data
               });
            })
            .catch((error) => {
               console.log(error);
            });
         return () => {
            controller.abort();
         };
      }
   }, [projectDispatch, projects]);

   return [projects, projectDispatch];
}