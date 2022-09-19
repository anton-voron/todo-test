import { ApiProperty } from "@nestjs/swagger";
import { TaskEntity } from "@common/entities/sqlite-db/task.entity";
import { TaskStatus } from "@common/constants/task-status.enum";

export class TaskDto {
  @ApiProperty({name: 'id', type: Number})
  public id: number;

  @ApiProperty({name: 'title', type: String})
  public title: string;

  @ApiProperty({name: 'description', type: String})
  public description: string;

  @ApiProperty({name: 'status', type: TaskStatus})
  public status: TaskStatus;

  constructor(task: TaskEntity) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
  }
}
