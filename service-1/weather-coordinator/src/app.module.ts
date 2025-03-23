import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { OpenWeatherModule } from './integrations/open-weather/open-weather.module';
import { ConfigModule } from '@nestjs/config';
import { GeocodingModule } from './geocoding/geocoding.module';
import * as Joi from 'joi';

@Module({
  imports: [
    WeatherModule,
    OpenWeatherModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        OPEN_WEATHER_BASE_URL: Joi.string().required(),
        OPEN_WEATHER_API_KEY: Joi.string().required(),
      }),
    }),
    GeocodingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
