import { Injectable, Logger } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf, Markup } from 'telegraf';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
  private readonly logger: Logger = new Logger(TelegramService.name);
  private readonly logFilePath: string;
  private readonly ownerChatId: string;
  private activeConversations: Map<string, string> = new Map<string, string>();

  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.logFilePath = this.configService.get<string>('LOG_FILE_PATH');
    this.ownerChatId = this.configService.get<string>('OWNER_CHAT_ID');
    this.initListeners();
  }

  private initListeners() {
    this.bot.start(async (ctx: Context): Promise<void> => {
      const chatId: string = String(ctx.chat.id);
      const username: string = ctx.from?.username || `User_${chatId}`;
      this.logger.log(`User @${username} (${chatId}) started bot`);

      await this.prisma.user.upsert({
        where: { chatId },
        update: { username, isWaitingForRegion: true },
        create: { chatId, username, isWaitingForRegion: true },
      });

      await ctx.reply('Привіт! Вкажіть свій регіон для отримання прогнозу:');
    });

    this.bot.on('message', async (ctx: Context): Promise<void> => {
      const chatId: string = String(ctx.chat.id);
      const username: string = ctx.from?.username || `User_${chatId}`;
      const message: string = ctx.text || '[не текстове повідомлення]';
      const timestamp: string = new Date().toISOString();

      if (
        chatId === this.ownerChatId &&
        message.startsWith('Почати спілкування з')
      ) {
        const targetUsername: string = message.split(' ')[3];
        const targetUser = await this.prisma.user.findUnique({
          where: { username: targetUsername },
        });

        if (targetUser) {
          this.activeConversations.set(this.ownerChatId, targetUser.chatId);
          this.activeConversations.set(targetUser.chatId, this.ownerChatId);
          await this.sendMessageToUserByChatId(
            targetUser.chatId,
            'Погода UA починає діалог',
          );
          await ctx.reply(`Розпочато спілкування з @${targetUsername}.`);
        } else {
          await ctx.reply(`Користувача @${targetUsername} не знайдено.`);
        }
        return;
      }

      if (chatId === this.ownerChatId && message === 'Завершити спілкування') {
        const targetChatId: string = this.activeConversations.get(
          this.ownerChatId,
        );
        if (targetChatId) {
          this.activeConversations.delete(this.ownerChatId);
          this.activeConversations.delete(targetChatId);
          await this.sendMessageToUserByChatId(
            targetChatId,
            'Ініціатор завершив спілкування.',
          );
          await ctx.reply('Спілкування завершено.');
        } else {
          await ctx.reply('Зараз немає активного діалогу.');
        }
        return;
      }

      const activeChatId: string = this.activeConversations.get(chatId);
      if (activeChatId) {
        await this.sendMessageToUserByChatId(activeChatId, message);
        return;
      }

      const user = await this.prisma.user.findUnique({ where: { chatId } });

      if (user?.isWaitingForRegion) {
        await this.prisma.user.update({
          where: { chatId },
          data: { region: message, isWaitingForRegion: false },
        });

        await ctx.reply(
          `Регіон "${message}" збережено!`,
          this.getMenuKeyboard(),
        );
      } else {
        this.logger.log(`@${username}: ${message}`);
        this.logMessageIntoFile({ chatId, username, timestamp, message });
        await this.sendMessageToUserByChatId(
          this.ownerChatId,
          `${username}: ${message}`,
        );
      }
    });

    this.bot.action('forecast_week', async (ctx) => {
      await ctx.answerCbQuery();
      await ctx.reply('Прогноз на тиждень: [Тут буде прогноз]');
    });

    this.bot.action('change_region', async (ctx) => {
      const chatId: string = String(ctx.chat.id);
      await this.prisma.user.update({
        where: { chatId },
        data: { isWaitingForRegion: true },
      });
      await ctx.answerCbQuery();
      await ctx.reply('Введіть новий регіон:');
    });

    this.bot.action('stop_forecasts', async (ctx) => {
      const chatId: string = String(ctx.chat.id);
      await this.prisma.user.update({
        where: { chatId },
        data: { receiveForecasts: false },
      });
      await ctx.answerCbQuery();
      await ctx.reply('Ви відписалися від прогнозів.');
    });
  }

  private getMenuKeyboard() {
    return Markup.inlineKeyboard([
      [Markup.button.callback('📅 Прогноз на тиждень', 'forecast_week')],
      [Markup.button.callback('🌍 Змінити регіон', 'change_region')],
      [
        Markup.button.callback(
          '🚫 Зупинити отримання прогнозів',
          'stop_forecasts',
        ),
      ],
    ]);
  }

  private logMessageIntoFile(entry: object) {
    const logData = JSON.stringify(entry) + '\n';
    fs.appendFile(this.logFilePath, logData, (err) => {
      if (err) {
        this.logger.error('Помилка запису в файл:', err);
      }
    });
  }

  async sendWeatherUpdate(chatId: string, forecast: string) {
    await this.bot.telegram.sendMessage(
      chatId,
      `Прогноз погоди:\n${forecast}`,
      this.getMenuKeyboard(),
    );
  }

  async sendMessageToUserByChatId(chatId: string, message: string) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
