export interface ITask {
   id: string;
   startDate: string;
   dueDate: string;
   title: string;
   description: string;
   status: string;
   leftTime?: number;
   dueAt?: string;
}
