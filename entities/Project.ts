import { ITask } from './../interfaces/ITask';
import dayjs from 'dayjs';
import IProject from '../interfaces/IProject';
import Task from './Task';

export default class Project implements IProject {
   constructor(
      public title: string,
      public startDate: Date,
      public description: string,
      public tasks: ITask[],
      public id?: string,
      public dueDate?: Date | null,
      public dueAt?: Date | null,
      public createdAt?: Date,
      public updatedAt?: Date
   ) {
      this.transformTasks();
   }
   get leftTime() {
      return dayjs(this.dueDate).diff(dayjs(), 'day');
   }
   get toDo() {
      return (
         this.tasks?.filter((task: ITask) => task.status !== 'concluida')
            .length || 0
      );
   }

   get percentDone() {
      const done =
         this.tasks?.filter((task: ITask) => task.status === 'concluida')
            .length || 0;
      const total = this.tasks?.length || 0;
      return Math.round((100 * done) / total);
   }
   transformTasks() {
      this.tasks = this.tasks.map((task: ITask) => {
         const {
            id,
            startDate,
            dueDate,
            title,
            description,
            status,
            dependencies,
            createdAt,
            dueAt,
            projectId,
            isDependencyOf
         } = task;
         return new Task(
            id,
            startDate,
            dueDate,
            title,
            description,
            status,
            dependencies,
            createdAt,
            dueAt,
            projectId,
            isDependencyOf
         );
      });
   }
   static createFromObject(project: IProject) {
      const {
         title,
         startDate,
         description,
         tasks,
         id,
         dueDate,
         dueAt,
         createdAt,
         updatedAt
      } = project;
      return new Project(
         title,
         startDate,
         description,
         tasks,
         id,
         dueDate,
         dueAt,
         createdAt,
         updatedAt
      );
   }
}
