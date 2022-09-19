import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbConnectionName } from "@common/constants/db-connection-name.enum";
import { UserRepository } from "@common/repositories/sqlite-db/user.repository";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature(
    [
      UserRepository
    ], DbConnectionName.SQLITE),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
