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
import { IsInt, IsString, Length, IsDate, IsPositive } from 'class-validator'
@Entity('task')
export default class Task {
  @IsInt()
  @IsPositive()
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @IsString()
  @Length(1, 255)
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string

  @IsString()
  @Column({ type: 'text', nullable: true })
  description?: string

  @IsDate()
  @Column({ name: 'due_date', type: 'date', nullable: true })
  due_date?: Date

  @IsDate()
  @CreateDateColumn({ name: 'created_at', nullable: false, default: 'now()' })
  created_at: Date

  @IsDate()
  @UpdateDateColumn({ name: 'updated_at', nullable: false, default: 'now()' })
  updated_at: Date

  @IsDate()
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date | null

  @IsInt()
  @IsPositive()
  @Column({ name: 'user_id' })
  user_id: number

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User
}
