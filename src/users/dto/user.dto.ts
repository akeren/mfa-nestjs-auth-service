import { User } from '../models';

export class UserDto {
  public uuid: string;
  public id: number;
  public email: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
