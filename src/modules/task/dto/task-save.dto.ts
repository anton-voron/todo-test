import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TaskSaveDto {
  @ApiProperty({name: 'title', type: String})
  @IsString()
  public title: string;

  @ApiProperty({name: 'description', type: String})
  @IsString()
  public description: string;
}
