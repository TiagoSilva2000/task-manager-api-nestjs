import Token from 'src/app/auth/models/token.entity'
import Task from 'src/app/task/models/task.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string

  @OneToMany(
    () => Token,
    token => token.user
  )
  tokens: Token[]

  @OneToMany(
    () => Task,
    task => task.user
  )
  tasks: Task[]
}
