import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CityParamDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city: string;
}
