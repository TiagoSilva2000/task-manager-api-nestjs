import Token from 'src/app/auth/models/token.entity'
import Task from 'src/app/task/models/task.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IsInt, IsString, Length, IsEmail, IsPositive } from 'class-validator'
@Entity('users')
export default class User {
  @IsInt()
  @IsPositive()
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @IsString()
  @Length(1, 255)
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string

  @IsString()
  @IsEmail()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string

  @IsString()
  @Length(8, 255)
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
