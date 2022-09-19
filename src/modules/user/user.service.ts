import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSaveDto } from "@modules/user/dto/user-save.dto";
import { UserEntity } from "@common/entities/sqlite-db/user.entity";
import { UserRepository } from "@common/repositories/sqlite-db/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { DbConnectionName } from "@common/constants/db-connection-name.enum";
import { DeleteResult } from "typeorm";
import { UserUpdateDto } from "@modules/user/dto/user-update.dto";
import { sanitizeObject } from "@common/utils";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository, DbConnectionName.SQLITE)
    private userRepository: UserRepository,
  ) {}

  public async save(dto: UserSaveDto): Promise<UserEntity> {
    const user: UserEntity = Object.assign(new UserEntity(), {...dto});
    return await this.userRepository.save(user);
  }

  public async get(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne(id);
    if(!user) throw new NotFoundException(`User with id: ${id} not found`)
    return user;
  }

  public async update(id: number, dto: UserUpdateDto): Promise<UserEntity> {
    const user: UserEntity = await this.get(id);
    const userToUpdate: UserEntity = Object.assign(user, {...sanitizeObject(dto)})
    return await this.userRepository.save(userToUpdate);
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult: DeleteResult = await this.userRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
