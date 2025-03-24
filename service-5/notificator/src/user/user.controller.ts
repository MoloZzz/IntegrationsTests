import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users for notificate API')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Повернути всіх користувачів' })
  async getAllUsers() {
    return await this.service.getAll();
  }
}
