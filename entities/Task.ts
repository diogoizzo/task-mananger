import dayjs from 'dayjs';
import { ITask } from '../interfaces/ITask';

export default class Task implements ITask {
   constructor(
      public id: string,
      public startDate: Date,
      public dueDate: Date,
      public title: string,
      public description: string,
      public status: string,
      public dependencies?: ITask[],
      public createdAt?: Date,
      public dueAt?: Date,
      public projectId?: string,
      public isDependencyOf?: ITask[]
   ) {
      this.transformeDependencies();
      this.transformeIsDependencyOf();
   }
   transformeDependencies() {
      if (this.dependencies && this.dependencies.length > 0) {
         this.dependencies = this.dependencies.map((task: ITask) => {
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
   }
   transformeIsDependencyOf() {
      if (this.isDependencyOf && this.isDependencyOf.length > 0) {
         this.isDependencyOf = this.isDependencyOf.map((task: ITask) => {
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
   }
   get leftTime() {
      return Number(dayjs(this.dueDate).diff(dayjs(), 'day'));
   }
   get formatedDueAt() {
      return dayjs(this.dueAt).format('DD/MM/YYYY');
   }

   get formatedDueDate() {
      return dayjs(this.dueDate).format('DD/MM/YYYY');
   }

   get formatedCreatedAt() {
      return dayjs(this.createdAt).format('DD/MM/YYYY');
   }
   get formatedStartDate() {
      return dayjs(this.startDate).format('DD/MM/YYYY');
   }
   static createFromObject(task: ITask) {
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
   }
}
