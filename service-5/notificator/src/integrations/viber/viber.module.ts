import { Module } from '@nestjs/common';
import { ViberService } from './viber.service';

@Module({
  providers: [ViberService]
})
export class ViberModule {}
