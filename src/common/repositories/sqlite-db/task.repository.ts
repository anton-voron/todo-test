import { EntityRepository, Repository } from "typeorm";
import { TaskEntity } from "@common/entities/sqlite-db/task.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {

  public async getByUserId(userId: number): Promise<TaskEntity[]> {
    return await this.createQueryBuilder('Task')
      .leftJoin('Task.user', 'User')
      .where('User.id = :userId', {userId})
      .getMany();
  }
}
