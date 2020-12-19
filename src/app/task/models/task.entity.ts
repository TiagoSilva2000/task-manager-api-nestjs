import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import User from '../../user/models/user.entity'

@Entity('task')
export default class Task {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ name: 'due_date', type: 'date', nullable: true })
  due_date?: Date

  @CreateDateColumn({ name: 'created_at', nullable: false, default: 'now()' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: false, default: 'now()' })
  updated_at: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date | null

  @Column({name: 'user_id'})
  user_id: number

  @ManyToOne(
    () => User,
    { onDelete: 'CASCADE' }
    )
  @JoinColumn({ name: 'user_id' })
  user: User
}
