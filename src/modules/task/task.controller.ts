import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from "@modules/task/task.service";
import { ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";
import { TaskSaveDto } from "@modules/task/dto/task-save.dto";
import { TaskDto } from "@modules/task/dto/task.dto";
import { TaskUpdateDto } from "@modules/task/dto/task-update.dto";
import { TaskEntity } from "@common/entities/sqlite-db/task.entity";
import { TaskStatusValidationPipe } from "@modules/task/pipes/task-validate.pipe";

@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) {}

  @Post('/:userId')
  @ApiParam({ name: 'userId', required: true, type: Number })
  @ApiBody({type: TaskSaveDto})
  @ApiResponse({ status: 200, description: "Create user's task", type: TaskDto })
  public async save(
    @Param('userId') userId: number,
    @Body() dto: TaskSaveDto
  ): Promise<TaskDto> {
    const task: TaskEntity = await this.taskService.save(userId, dto);
    return new TaskDto(task);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Get task', type: TaskDto })
  public async get(
    @Param('id') id: number,
  ): Promise<TaskDto> {
    const task: TaskEntity = await this.taskService.get(id);
    return new TaskDto(task);
  }


  @Patch('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBody({type: TaskUpdateDto})
  @ApiResponse({ status: 200, description: 'Update task', type: [TaskDto] })
  public async update(
    @Param('id') id: number,
    @Body(TaskStatusValidationPipe) dto: TaskUpdateDto
  ): Promise<TaskDto> {
    const task: TaskEntity = await this.taskService.update(id, dto);
    return new TaskDto(task)
  }


  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Delete task', type: Boolean })
  public async delete(
    @Param('id') id: number,
  ): Promise<Boolean> {
    return await this.taskService.delete(id);
  }

  @Get('/users/:userId')
  @ApiParam({ name: 'userId', required: true, type: Number })
  @ApiResponse({ status: 200, description: "Get user's task", type: [TaskDto] })
  public async getByUserId(
    @Param('userId') userId: number,
  ): Promise<TaskDto[]> {
    const tasks: TaskEntity[] = await this.taskService.getByUserId(userId);
    return tasks.map(el => new TaskDto(el));
  }
}
