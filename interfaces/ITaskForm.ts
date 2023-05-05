import { ITask } from './ITask';

export default interface ITaskFrom {
   id: string;
   startDate: Date;
   dueDate: Date;
   title: string;
   description: string;
   status: string;
   dependencies: ITask[];
   project?: string;
   projetoId?: string;
}
