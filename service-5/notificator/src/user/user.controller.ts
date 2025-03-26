import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParamDto } from 'src/common';

@ApiTags('Users for notificate API')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Повернути всіх користувачів' })
  async getAllUsers() {
    return await this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Повернути користувача по chatId' })
  async findUserByChatId(@Param() param: IdParamDto) {
    return await this.service.findUserByChatId(param.id);
  }
}
