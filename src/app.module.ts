import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { GrpcCalculatorModule } from './modules/grpc-calculator/grpc-calculator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConnectionName } from '@common/constants/db-connection-name.enum';
import { ConfigService } from '@modules/shared/services/config.service';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      name: DbConnectionName.SQLITE,
      useFactory: (configService: ConfigService) => configService.dbOption,
      inject: [ConfigService],
    }),
    GrpcCalculatorModule,
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
