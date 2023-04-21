import { ITask } from './ITask';

export default interface IProject {
   id: string;
   title: string;
   startDate: Date;
   dueDate?: Date;
   dueAt?: Date | null;
   createdAt: Date;
   updatedAt: Date;
   tarefas: ITask[];
   description: string;
   leftTime?: number;
}
