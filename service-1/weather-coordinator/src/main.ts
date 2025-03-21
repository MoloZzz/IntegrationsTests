import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/coordinator');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // then validator will strip validated object of any properties that do not have any decorators (ValidatorOptions)
      transform: true, // allow automatic transformation of incoming data (ValidationPipeOptions)
      transformOptions: {
        enableImplicitConversion: true, // enable transformation of data types (ClassTransformOptions)
      },
    }),
  );

  const configService = app.get(ConfigService);
  if (configService.get<string>('API_DOCS_ENABLED') === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Coordinator API documentation')
      .setDescription(
        'Development API documentation for Coordinator (service-1)',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/coordinator/api-docs', app, document);
  }

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
