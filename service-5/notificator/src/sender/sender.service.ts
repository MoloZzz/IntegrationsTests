import { Inject, Injectable } from '@nestjs/common';
import { TelegramService } from 'src/integrations/telegram/telegram.service';

@Injectable()
export class SenderService {
    constructor(@Inject(TelegramService) private readonly telegramService: TelegramService){}

    public async sendMessageToTelegramUser(chatId: string, message: string) : Promise<void> {
        await this.telegramService.sendMessageToUserByChatId(chatId, message);
    }
}
