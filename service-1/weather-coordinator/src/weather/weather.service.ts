import { Inject, Injectable } from '@nestjs/common';
import { CityParamDto } from 'src/common/dto';
import { IWeatherDataResponse } from 'src/common/interfaces';
import { OpenWeatherModule } from 'src/integrations/open-weather/open-weather.module';
import { OpenWeatherService } from 'src/integrations/open-weather/open-weather.service';

@Injectable()
export class WeatherService {
  constructor(
    @Inject(OpenWeatherService)
    private readonly openWeatherIntegrationService: OpenWeatherService,
  ) {}

  async getWeatherDataByCity(city: string): Promise<IWeatherDataResponse> {
    throw new Error('Method not implemented.');
  }

  async getWeatherDataByCoordinates(
    latitude: string,
    longitude: string,
  ): Promise<IWeatherDataResponse> {
    const data: IWeatherDataResponse =
      await this.openWeatherIntegrationService.getWeatherDataByCoordinates(
        latitude,
        longitude,
      );
    return data;
  }
}
