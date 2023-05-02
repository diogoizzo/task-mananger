import { IInboxTask } from '../interfaces/IInboxTask';

export default class Inbox implements IInboxTask {
   constructor(
      public id: string,
      public title: string,
      public createdAt: Date,
      public updatedAt: Date,
      public userId: string
   ) {}
}
