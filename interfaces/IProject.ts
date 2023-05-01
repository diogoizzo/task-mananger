import { ITask } from './ITask';

export default interface IProject {
   id?: string;
   title: string;
   startDate: Date;
   dueDate?: Date | null;
   dueAt?: Date | null;
   createdAt?: Date;
   updatedAt?: Date;
   tarefas: ITask[];
   description: string;
   leftTime?: number;
}
