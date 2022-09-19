import { Module } from '@nestjs/common';
import { GrpcCalculatorService } from './grpc-calculator.service';

@Module({
  controllers: [GrpcCalculatorService],
})
export class GrpcCalculatorModule {}
