export class UserTable {
  id: number;
  email: string;
  registration: any;
  verification: any;
  membership: string;
  lastVisit: any;

  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.registration = data.register_date;
    this.verification = data.verification_date;
    this.membership = data.membership;
    this.lastVisit = data.last_visit;
  }
}
