import { UserTable } from './user-table.model';

export class DataResponse {
  count: number;
  users: UserTable[];


  constructor(count, users) {
    this.count = count;
    this.users = users;
  }
}
