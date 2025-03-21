import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CoordinatesDto {
  @ApiProperty({ example: '50.45', description: 'Широта' })
  @IsString()
  @Matches(/^[-+]?\d+(\.\d+)?$/, {
    message: 'lat має бути числом у вигляді рядка',
  })
  lat: string;

  @ApiProperty({ example: '30.52', description: 'Довгота' })
  @IsString()
  @Matches(/^[-+]?\d+(\.\d+)?$/, {
    message: 'lon має бути числом у вигляді рядка',
  })
  lon: string;
}
