import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "@common/entities/sqlite-db/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{
}
