import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UserUpdateDto {
  @ApiPropertyOptional({name: 'firstName', type: String})
  @IsOptional()
  @IsString()
  public firstName?: string;

  @ApiPropertyOptional({name: 'lastName', type: String})
  @IsOptional()
  @IsString()
  public lastName?: string;
}
