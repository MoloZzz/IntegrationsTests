import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { OpenWeatherModule } from './integrations/open-weather/open-weather.module';

@Module({
  imports: [WeatherModule, OpenWeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
