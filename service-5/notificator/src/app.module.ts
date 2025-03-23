import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './integrations/telegram/telegram.module';
import { EmailModule } from './integrations/email/email.module';

@Module({
  imports: [TelegramModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
