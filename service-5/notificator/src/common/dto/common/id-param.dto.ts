import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class IdParamDto {
    @ApiProperty()
    @IsDefined()
    @Type(() => String)
    @IsString()
    id: string;
}
