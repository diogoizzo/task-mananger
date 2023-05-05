import dayjs from 'dayjs';
import IProject from '../interfaces/IProject';
import { ITask } from '../interfaces/ITask';

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
   ) {}
   get leftTime() {
      return dayjs(this.dueDate).diff(dayjs(), 'day');
   }
}
