import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@common/entities/sqlite-db/user.entity';
import { TaskStatus } from "@common/constants/task-status.enum";


@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn({name: 'id', type: 'integer'})
  public id: number;

  @Column({name: 'title', type: 'varchar', nullable: false})
  public title: string;

  @Column({name: 'description', type: 'varchar', nullable: false})
  public description: string

  @Column({name: 'status', type: 'varchar', nullable: false})
  public status: TaskStatus;

  @Column({name: 'user_id', type: 'integer', nullable: false})
  public userId: number;

  @ManyToOne(() => UserEntity, user => user.tasks, {eager: false, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  public user: UserEntity;
}
