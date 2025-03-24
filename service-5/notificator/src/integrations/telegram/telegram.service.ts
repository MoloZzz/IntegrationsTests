import { Injectable, Logger } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly logFilePath;

  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.logFilePath = this.configService.get<string>('LOG_FILE_PATH');
    this.initListeners();
  }

  private initListeners() {
    this.bot.start(async (ctx: Context) => {
      const chatId: string = String(ctx.chat.id);
      const username: string = ctx.from?.username || `User_${chatId}`;
      this.logger.log(`User @${username} (${chatId}) started bot`);

      await this.prisma.user.upsert({
        where: { chatId },
        update: {},
        create: { chatId, username },
      });

      await ctx.reply('Привіт! Вкажіть свій регіон для отримання прогнозу:');
    });

    this.bot.on('message', async (ctx: Context) => {
      const chatId: string = String(ctx.chat.id);
      const username: string = ctx.from?.username || `User_${chatId}`;
      const message: string = ctx.text || '[не текстове повідомлення]';
      const timestamp: string = new Date().toISOString();

      const logEntry = {
        chatId,
        username,
        timestamp,
        message,
      };

      console.log(`@${username}: ${message}`);
      this.logger.log(`@${username}: ${message}`);
      this.logMessageIntoFile(logEntry);

      await ctx.reply(
        'Ваші сповіщення передаються власнику бота. Дякую що користуєтесь нашим прогнозом погоди.',
      );
    });
  }

  private logMessageIntoFile(entry: object) {
    const logData = JSON.stringify(entry) + '\n';
    fs.appendFile(this.logFilePath, logData, (err) => {
      if (err) {
        this.logger.error('Помилка запису в файл:', err);
      }
    });
  }

  async sendWeatherUpdate(chatId: number, forecast: string) {
    await this.bot.telegram.sendMessage(
      chatId,
      `Прогноз погоди на завтра:\n${forecast}`,
    );
  }
}
