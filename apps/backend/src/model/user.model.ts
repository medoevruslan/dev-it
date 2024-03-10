import { CreateUserModel } from '../service/user.service';
import { CreateUserType } from '../controller/auth.controller';
import { PrismaClient } from '@/prisma/client';

export class UserModel {
  #storage = new PrismaClient().user;
  async create(user: CreateUserModel) {
    return this.#storage.create({ data: { ...user } });
  }
  async update(id: string, username: CreateUserType['username']) {
    this.#storage.update({ where: { id }, data: { username } });
  }
  async delete(id: string) {
    this.#storage.delete({ where: { id } });
  }
  async getAll() {
    return this.#storage.findMany();
  }
  async getById(id: string) {
    return this.#storage.findUnique({ where: { id } });
  }

  async getByEmail(email: string) {
    return this.#storage.findUnique({ where: { email: email } });
  }
}
