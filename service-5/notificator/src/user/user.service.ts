import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async findUserByChatId(chatId: string) {
    return this.prisma.user.findUnique({ where: { chatId } });
  }

  async upsertUser(chatId: string, username: string) {
    return this.prisma.user.upsert({
      where: { chatId },
      update: { username, isWaitingForRegion: true },
      create: { chatId, username, isWaitingForRegion: true },
    });
  }

  async updateRegion(chatId: string, region: string) {
    return this.prisma.user.update({
      where: { chatId },
      data: { region, isWaitingForRegion: false },
    });
  }
}
