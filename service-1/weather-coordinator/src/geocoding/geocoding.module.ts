import { Module } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import { GeocodingController } from './geocoding.controller';
import { OpenWeatherModule } from 'src/integrations/open-weather/open-weather.module';

@Module({
  imports: [OpenWeatherModule],
  providers: [GeocodingService],
  controllers: [GeocodingController],
})
export class GeocodingModule {}
