export interface ITask {
   id: string;
   createdAt?: Date;
   startDate: Date;
   dueDate: Date;
   title: string;
   description: string;
   status: string;
   leftTime?: number;
   dueAt?: Date;
   projetoId?: string;
   dependencies: ITask[];
   isDependencyOf?: ITask[];
}
