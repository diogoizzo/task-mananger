import IProject from '../interfaces/IProject';
import { ITask } from '../interfaces/ITask';

export default class Project implements IProject {
   constructor(
      public title: string,
      public startDate: Date,
      public description: string,
      public tarefas: ITask[],
      public id?: string,
      public dueDate?: Date | null,
      public dueAt?: Date | null,
      public createdAt?: Date,
      public updatedAt?: Date,
      public leftTime?: number
   ) {}
}
