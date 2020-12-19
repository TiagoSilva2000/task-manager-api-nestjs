import User from 'src/app/user/models/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('token')
export default class Token {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  token: string

  @Column({ type: 'varchar', length: 30, nullable: false, default: 'jwt' })
  token_type: string

  @Column({ type: 'boolean', nullable: false, default: false })
  is_revoked: boolean
  
  @Column({name: 'user_id', nullable: false })
  user_id: number
  
  @Column({ type: 'timestamp', nullable: false, default: 'now()' })
  created_at: Date
  
  @ManyToOne(
    () => User,
    { onDelete: 'CASCADE', nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  user: User
}
