import { UserEntity } from "@common/entities/sqlite-db/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({name: 'id', type: Number})
  public id: number;

  @ApiProperty({name: 'firstName', type: String})
  public firstName: string;

  @ApiProperty({name: 'lastName', type: String})
  public lastName: string;


  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
