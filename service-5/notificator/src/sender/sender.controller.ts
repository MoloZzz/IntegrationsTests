import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SenderService } from './sender.service';
import { SendTeleramMessage } from 'src/common/dto';

@ApiTags('Send message API')
@Controller('sender')
export class SenderController {
  constructor(private readonly service: SenderService) {}

  @Post('/telegram')
  @ApiOperation({
    summary: 'Надіслати повідомлення юзеру через телеграм бота по чат ід',
  })
  async sendMessageToTelegramUser(
    @Body() data: SendTeleramMessage,
  ): Promise<void> {
    await this.service.sendMessageToTelegramUser(data.chatId, data.message);
  }
}
