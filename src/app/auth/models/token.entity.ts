import User from 'src/app/user/models/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import {
  IsInt,
  IsPositive,
  IsString,
  Length,
  IsBoolean,
  IsDate
} from 'class-validator'
@Entity('token')
export default class Token {
  @IsInt()
  @IsPositive()
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @IsString()
  @Length(1, 255)
  @Column({ type: 'varchar', length: 255, nullable: false })
  token: string

  @IsString()
  @Length(1, 30)
  @Column({ type: 'varchar', length: 30, nullable: false, default: 'jwt' })
  token_type: string

  @IsBoolean()
  @Column({ type: 'boolean', nullable: false, default: false })
  is_revoked: boolean

  @IsInt()
  @IsPositive()
  @Column({ name: 'user_id', nullable: false })
  user_id: number

  @IsDate()
  @Column({ type: 'timestamp', nullable: false, default: 'now()' })
  created_at: Date

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User
}
