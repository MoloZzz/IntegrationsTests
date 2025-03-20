import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
export class CityParamDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city: string;
}
