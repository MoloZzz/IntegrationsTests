import { Module } from '@nestjs/common';
import { OpenWeatherService } from './open-weather.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [OpenWeatherService],
  exports: [OpenWeatherService],
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('OPEN_WEATHER_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class OpenWeatherModule {}
