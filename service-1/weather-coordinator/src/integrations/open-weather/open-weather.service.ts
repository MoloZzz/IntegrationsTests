import { Injectable } from '@nestjs/common';
import config from '../../../config';
import { IWeatherDataResponse } from 'src/common/interfaces';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { temperatureUnitsEnum } from 'src/common/enums';

const openWeatherConfig = config().openApiIntegration;

@Injectable()
export class OpenWeatherService {
  private readonly indexURL: string;
  private readonly headers: string;
  private readonly apiKey: string;
  private readonly lang: string;

  constructor(private readonly httpService: HttpService) {
    this.indexURL = openWeatherConfig.url;
    this.apiKey = openWeatherConfig.apiKey;
    this.lang = openWeatherConfig.language;
  }

  public async getWeatherDataByCoordinates(
    latitude: string,
    longitude: string,
  ): Promise<IWeatherDataResponse> {
    console.log('in OpenWeatherService.getWeatherDataByCoordinates');
    try {
      const params = new URLSearchParams({
        lat: latitude,
        lon: longitude,
        units: temperatureUnitsEnum.metric,
        lang: this.lang,
        appid: this.apiKey,
      });
      console.log(params.toString());

      const url: string = `${this.indexURL}?${params.toString()}`;
      const res: AxiosResponse<IWeatherDataResponse> =
        await this.httpService.axiosRef.get<IWeatherDataResponse>(url);

      return res.data;
    } catch (error) {
      console.error(
        'Error OpenWeatherService.getWeatherDataByCoordinates:',
        error,
      );
      throw new Error('Failed to fetch weather data');
    }
  }
}
