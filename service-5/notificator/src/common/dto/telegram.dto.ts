import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendTeleramMessage {
  @ApiProperty({ example: '123456789', description: 'ID чату користувача' })
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @ApiProperty({ example: 'Привіт, це повідомлення від бота!', description: 'Текст повідомлення' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
