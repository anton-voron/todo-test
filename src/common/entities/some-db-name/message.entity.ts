import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn({name: 'id', type: 'integer'})
  id: number;

  @Column({name: 'title', type: 'varchar'})
  title: string;

  @Column({name: 'value', type: 'varchar'})
  value: string
}
