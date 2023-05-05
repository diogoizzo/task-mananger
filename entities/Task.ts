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
      public dependencies: ITask[],
      public createdAt?: Date,
      public dueAt?: Date,
      public projetoId?: string,
      public isDependencyOf?: ITask[]
   ) {}

   get leftTime() {
      return Number(dayjs(this.dueDate).diff(dayjs(), 'day'));
   }
   get formatedDueAt() {
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
         projetoId,
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
         projetoId,
         isDependencyOf
      );
   }
}
