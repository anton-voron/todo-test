import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbConnectionName } from "@common/constants/db-connection-name.enum";
import { TaskRepository } from "@common/repositories/sqlite-db/task.repository";
import { UserModule } from "@modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        TaskRepository,
      ], DbConnectionName.SQLITE),

    UserModule
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
