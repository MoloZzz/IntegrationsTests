import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { CityParamDto, CoordinatesDto } from 'src/common/dto';
import { IWeatherDataResponse } from 'src/common/interfaces';

@ApiTags('Weather API')
@Controller('weather')
export class WeatherController {
  constructor(private readonly service: WeatherService) {}

  @Get('/city/:city')
  @ApiOperation({ summary: 'Отримати погоду за містом' })
  @ApiParam({ name: 'city', description: 'Назва міста', type: 'string' })
  @ApiResponse({ status: 200, description: 'Дані про погоду', type: Object })
  async getWeatherDataByCity(
    @Param() cityDto: CityParamDto,
  ): Promise<IWeatherDataResponse> {
    return this.service.getWeatherDataByCity(cityDto.city);
  }

  @Get('/coordinates')
  @ApiOperation({ summary: 'Отримати погоду за координатами' })
  @ApiQuery({
    name: 'lat',
    description: 'Широта',
    type: 'string',
    example: '50.45',
  })
  @ApiQuery({
    name: 'lon',
    description: 'Довгота',
    type: 'string',
    example: '30.52',
  })
  @ApiResponse({ status: 200, description: 'Дані про погоду', type: Object })
  async getWeatherDataByCoordinates(
    @Query() coordinatesDto: CoordinatesDto,
  ): Promise<IWeatherDataResponse> {
    return this.service.getWeatherDataByCoordinates(
      coordinatesDto.lat,
      coordinatesDto.lon,
    );
  }
}
