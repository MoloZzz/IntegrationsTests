import { Module } from '@nestjs/common';
import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';
import { TelegramModule } from 'src/integrations/telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [SenderController],
  providers: [SenderService]
})
export class SenderModule {}
