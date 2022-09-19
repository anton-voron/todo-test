import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "@common/constants/task-status.enum";

export class TaskUpdateDto {
  @ApiPropertyOptional({name: 'title', type: String})
  @IsOptional()
  @IsNumber()
  public userId: number;

  @ApiPropertyOptional({name: 'title', type: String})
  @IsOptional()
  @IsString()
  public title: string;

  @ApiPropertyOptional({name: 'description', type: String})
  @IsOptional()
  @IsString()
  public description: string;

  @ApiPropertyOptional({name: 'status', type: TaskStatus})
  @IsOptional()
  @IsEnum(TaskStatus)
  public status: TaskStatus;

}
