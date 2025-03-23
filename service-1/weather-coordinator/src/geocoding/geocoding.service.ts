import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICoordinates } from 'src/common/interfaces';
import { OpenWeatherService } from 'src/integrations/open-weather/open-weather.service';

@Injectable()
export class GeocodingService {
  constructor(
    @Inject(OpenWeatherService)
    private readonly openWeatherIntegrationService: OpenWeatherService,
  ) {}

  public async getCoordinatesByCity(city: string): Promise<ICoordinates> {
    const response =
      await this.openWeatherIntegrationService.getGeocodingDataByCity(city);
    if (!response || response.length == 0) {
      throw new NotFoundException('Місто з такою назвою не знайдено ' + city);
    }
    const location = response[0];
    return {
      lat: location.lat,
      lon: location.lon,
    };
  }
}
