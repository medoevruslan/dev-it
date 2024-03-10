import { User } from '@/prisma/client';

export class UserDto {
  readonly username: string;
  readonly email: string;
  readonly userId: string;
  readonly created: string;
  readonly updated: string;

  constructor(user: User) {
    this.userId = user.id;
    this.username = user.username;
    this.email = user.email;
    this.created = user.createdAt.toISOString();
    this.updated = user.updatedAt.toISOString();
  }
}
