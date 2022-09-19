import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from "@common/constants/task-status.enum";
import { TaskUpdateDto } from "@modules/task/dto/task-update.dto";

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = [
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_TEST,
    TaskStatus.DONE,
  ];

  transform(dto: TaskUpdateDto, metadata: ArgumentMetadata): any {
    const status = dto.status.toUpperCase() as TaskStatus;
    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`${status} is an invalid status`);
    }
    dto.status = status;
    return dto;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}
