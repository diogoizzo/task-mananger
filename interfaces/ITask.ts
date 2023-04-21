export interface ITask {
   id: string;
   startDate: Date;
   dueDate: Date;
   title: string;
   description: string;
   status: string;
   leftTime?: number;
   dueAt?: Date;
   projetoId: string;
   dependencies: ITask[];
   isDependencyOf?: ITask[];
}
