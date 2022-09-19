import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from "@modules/user/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { DbConnectionName } from "@common/constants/db-connection-name.enum";
import { TaskRepository } from "@common/repositories/sqlite-db/task.repository";
import { TaskSaveDto } from "@modules/task/dto/task-save.dto";
import { TaskEntity } from "@common/entities/sqlite-db/task.entity";
import { TaskStatus } from "@common/constants/task-status.enum";
import { sanitizeObject } from "@common/utils";
import { DeleteResult } from "typeorm";
import { TaskUpdateDto } from "@modules/task/dto/task-update.dto";

@Injectable()
export class TaskService {
  constructor(
    private userService: UserService,
    @InjectRepository(TaskRepository, DbConnectionName.SQLITE)
    private taskRepository: TaskRepository,
  ){}


  public async save(userId: number, dto: TaskSaveDto): Promise<TaskEntity> {
    const user = await this.userService.get(userId);
    const task = Object.assign(new TaskEntity(), {...dto});
    task.status = TaskStatus.TODO;
    task.userId = user.id;
    task.user = user;
    const entity: TaskEntity = await this.taskRepository.save(task);
    return entity;
  }

  public async get(id: number): Promise<TaskEntity> {
    const task: TaskEntity = await this.taskRepository.findOne(id);
    if(!task) throw new NotFoundException(`Task with id: ${id} not found`)
    return task;
  }

  public async update(id: number, dto: TaskUpdateDto): Promise<TaskEntity> {
    const task: TaskEntity = await this.get(id);
    const taskToUpdate: TaskEntity = Object.assign(task, {...sanitizeObject(dto)})
    return await this.taskRepository.save(taskToUpdate);
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult: DeleteResult = await this.taskRepository.delete(id);
    return deleteResult.affected > 0;
  }

  public async getByUserId(userId: number): Promise<TaskEntity[]> {
    return await this.taskRepository.getByUserId(userId);
  }
}
