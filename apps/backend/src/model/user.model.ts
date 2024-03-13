import { CreateUserModel } from '../service/user.service';
import { PrismaClient } from '@/prisma/client';
import { CreateUserType } from '@/src/schema/auth.schema';

export class UserModel {
  private readonly storage = new PrismaClient().user;
  async create(user: CreateUserModel) {
    return this.storage.create({ data: { ...user } });
  }
  async update(id: string, username: CreateUserType['username']) {
    this.storage.update({ where: { id }, data: { username } });
  }
  async delete(id: string) {
    this.storage.delete({ where: { id } });
  }
  async getAll() {
    return this.storage.findMany();
  }
  async getById(id: string) {
    return this.storage.findUnique({ where: { id } });
  }

  async getByEmail(email: string) {
    return this.storage.findUnique({ where: { email: email } });
  }
}
