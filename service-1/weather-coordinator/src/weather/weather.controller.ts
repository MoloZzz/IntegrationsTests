import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CityParamDto } from 'src/common/dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly service: WeatherService) {}

  @Get(':city')
  async getDataByCity(city: CityParamDto): Promise<string>{
    return this.service.getDataByCity(city);
  }
}
