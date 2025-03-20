import { Injectable } from '@nestjs/common';
import { CityParamDto } from 'src/common/dto';

@Injectable()
export class WeatherService {
    async getDataByCity(city: CityParamDto): Promise<string> {
        throw new Error('Method not implemented.');
    }
}
