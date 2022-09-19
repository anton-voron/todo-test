import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from "@modules/user/user.service";
import { ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UserSaveDto } from "@modules/user/dto/user-save.dto";
import { UserDto } from "@modules/user/dto/user.dto";
import { UserEntity } from "@common/entities/sqlite-db/user.entity";
import { UserUpdateDto } from "@modules/user/dto/user-update.dto";
import { TaskDto } from "@modules/task/dto/task.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post('')
  @ApiBody({type: UserSaveDto})
  @ApiResponse({ status: 200, description: 'Get users', type: UserDto })
  public async save(
  @Body() dto: UserSaveDto
  ): Promise<UserDto> {
    const entity: UserEntity = await this.userService.save(dto);
    return new UserDto(entity);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Get user', type: UserDto })
  public async get(
    @Param('id') id: number,
  ): Promise<UserDto> {
    const entity: UserEntity = await this.userService.get(id);
    return new UserDto(entity);
  }


  @Patch('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Update user', type: UserUpdateDto })
  public async update(
    @Param('id') id: number,
    @Body() dto: UserUpdateDto
  ): Promise<UserDto> {
    const entity: UserEntity = await this.userService.update(id, dto);
    return new UserDto(entity);
  }


  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Delete user', type: Boolean })
  public async delete(
    @Param('id') id: number,
  ): Promise<Boolean> {
    return await this.userService.delete(id);
  }

}
