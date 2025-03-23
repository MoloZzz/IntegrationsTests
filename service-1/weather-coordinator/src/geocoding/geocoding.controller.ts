import { Controller, Get, Param } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ICoordinates } from 'src/common/interfaces';
import { CityParamDto } from 'src/common/dto';

@ApiTags('Geocoding API')
@Controller('geocoding')
export class GeocodingController {
  constructor(private readonly service: GeocodingService) {}

  @Get('/coordinates-by-city/:city')
  @ApiOperation({ summary: 'Отримати координати за містом' })
  async getCoordinatesByCity(
    @Param() data: CityParamDto,
  ): Promise<ICoordinates> {
    return this.service.getCoordinatesByCity(data.city);
  }
}
