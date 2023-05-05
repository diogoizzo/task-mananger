import { ITask } from './ITask';

export default interface IProject {
   id?: string;
   title: string;
   startDate: Date;
   dueDate?: Date | null;
   dueAt?: Date | null;
   createdAt?: Date;
   updatedAt?: Date;
   tasks: ITask[];
   description: string;
   leftTime?: number;
}
