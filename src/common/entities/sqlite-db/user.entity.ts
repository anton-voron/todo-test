import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "@common/entities/sqlite-db/task.entity";

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({name: 'id', type: 'integer'})
  public id: number;

  @Column({name: 'first_name', type: 'varchar', nullable: false})
  public firstName: string;


  @Column({name: 'last_name', type: 'varchar', nullable: false})
  public lastName: string;

  @OneToMany(() => TaskEntity, task => task.user, {eager: false, cascade: false})
  public tasks: TaskEntity[];
}
