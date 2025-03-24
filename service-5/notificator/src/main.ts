import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/notificator');
  const configService = app.get(ConfigService);
  if (configService.get<string>('API_DOCS_ENABLED') === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Notificator API documentation')
      .setDescription(
        'Development API documentation for Notificator (service-5)',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/notificator/api-docs', app, document);
  }
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
