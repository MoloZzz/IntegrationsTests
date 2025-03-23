import { Injectable, Logger } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);

  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private readonly prisma: PrismaService,
  ) {
    this.initListeners();
  }

  private initListeners() {
    this.bot.start(async (ctx) => {
      const chatId = ctx.chat.id;
      this.logger.log(`User ${chatId} started bot`);

      await this.prisma.user.upsert({
        where: { chatId },
        update: {},
        create: { chatId },
      });

      await ctx.reply('Привіт! Вкажіть свій регіон для отримання прогнозу:');
    });

    this.bot.on('text', async (ctx) => {
      const chatId = ctx.chat.id;
      const region = ctx.message.text;

      await this.prisma.user.update({
        where: { chatId },
        data: { region },
      });

      await ctx.reply(
        `Дякую! Ви будете отримувати прогноз погоди для регіону: ${region}`,
      );
    });
  }

  async sendWeatherUpdate(chatId: number, forecast: string) {
    await this.bot.telegram.sendMessage(
      chatId,
      `Прогноз погоди на завтра:\n${forecast}`,
    );
  }
}
