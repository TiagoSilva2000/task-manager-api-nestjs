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
import User from './user.entity'

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
  
  @JoinColumn({name: 'user_id'})
  @ManyToOne(() => User, {onDelete: 'CASCADE'})
  user: User
}
