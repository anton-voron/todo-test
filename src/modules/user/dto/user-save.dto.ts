import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserSaveDto {
  @ApiProperty({name: 'firstName', type: String})
  @IsString()
  firstName: string;

  @ApiProperty({name: 'lastName', type: String})
  @IsString()
  lastName: string;
}
