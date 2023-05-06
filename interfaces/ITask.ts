import Task from '../entities/Task';

export interface ITask {
   id: string;
   createdAt?: Date;
   startDate: Date;
   dueDate: Date;
   title: string;
   description: string;
   status: string;
   leftTime: number;
   dueAt?: Date;
   projectId?: string;
   dependencies?: ITask[];
   isDependencyOf?: ITask[];
   formatedDueAt: string;
   formatedCreatedAt: string;
   formatedStartDate: string;
   formatedDueDate: string;
}
