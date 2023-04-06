import { ITask } from './ITask';

export default interface IProject {
   id: string;
   title: string;
   startDate: Date;
   dueDate?: Date;
   dueAt?: Date;
   createdAt: Date;
   updatedAt: Date;
   tarefas: ITask[];
   description: string;
   leftTime?: number;
}
