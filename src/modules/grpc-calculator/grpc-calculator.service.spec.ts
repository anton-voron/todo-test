import { Test, TestingModule } from '@nestjs/testing';
import { GrpcCalculatorService } from './grpc-calculator.service';

describe('GrpcCalculatorService', () => {
  let service: GrpcCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrpcCalculatorService],
    }).compile();

    service = module.get<GrpcCalculatorService>(GrpcCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
