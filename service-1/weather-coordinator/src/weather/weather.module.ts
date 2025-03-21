import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { OpenWeatherModule } from 'src/integrations/open-weather/open-weather.module';

@Module({
  imports: [OpenWeatherModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
