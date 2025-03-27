import { Test, TestingModule } from '@nestjs/testing';
import { ViberService } from './viber.service';

describe('ViberService', () => {
  let service: ViberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViberService],
    }).compile();

    service = module.get<ViberService>(ViberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
