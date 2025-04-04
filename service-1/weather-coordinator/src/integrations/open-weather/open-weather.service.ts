import { Injectable } from '@nestjs/common';
import config from '../../../config';
import {
  IWeatherDataResponse,
  IWeatherLocationResponse,
} from 'src/common/interfaces';
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

      const url: string = `${this.indexURL}/data/2.5/weather?${params.toString()}`;
      const res: AxiosResponse<IWeatherDataResponse> =
        await this.httpService.axiosRef.get<IWeatherDataResponse>(url); //можна не вказувати тип response

      return res.data;
    } catch (error) {
      console.error(
        'Error OpenWeatherService.getWeatherDataByCoordinates:',
        error,
      );
      throw new Error('Failed to fetch weather data');
    }
  }

  /**q - City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.*/
  public async getGeocodingDataByCity(
    city: string,
  ): Promise<IWeatherLocationResponse[]> {
    console.log('in OpenWeatherService.getGeocodingDataByCity');
    try {
      const params = new URLSearchParams({
        q: city,
        appid: this.apiKey,
      });

      const url: string = `${this.indexURL}/geo/1.0/direct?${params.toString()}`;
      const res: AxiosResponse<IWeatherLocationResponse[]> =
        await this.httpService.axiosRef.get<IWeatherLocationResponse[]>(url);
      return res.data;
    } catch (error) {
      console.error('Error OpenWeatherService.getGeocodingDataByCity:', error);
      throw new Error('Failed to fetch coordinates by city');
    }
  } //TODO: test
}
