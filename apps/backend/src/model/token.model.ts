import { PrismaClient } from '@/prisma/client';

export class TokenModel {
  private readonly storage = new PrismaClient().token;
  async create(token: string, userId: string) {
    return this.storage.create({
      data: { userId: userId, refreshToken: token },
    });
  }
  async delete(token: string) {
    return this.storage.delete({ where: { refreshToken: token } });
  }
  async getAll() {
    return this.storage.findMany();
  }

  async get(token: string) {
    return this.storage.findUnique({ where: { refreshToken: token } });
  }
  async getByUserId(id: string) {
    return this.storage.findUnique({ where: { userId: id } });
  }

  async createOrUpdate(userId: string, token: string) {
    return this.storage.upsert({
      where: { userId: userId },
      create: { userId: userId, refreshToken: token },
      update: { refreshToken: token },
    });
  }
}
