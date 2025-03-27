import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './integrations/telegram/telegram.module';
import { EmailModule } from './integrations/email/email.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SenderModule } from './sender/sender.module';
import { ViberModule } from './integrations/viber/viber.module';
import * as Joi from 'joi';

@Module({
  imports: [
    TelegramModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        API_DOCS_ENABLED: Joi.string().optional(),
        LOG_FILE_PATH: Joi.string().required(),
      }),
    }),
    UserModule,
    SenderModule,
    ViberModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
