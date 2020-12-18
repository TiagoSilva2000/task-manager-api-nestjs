import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Task from './task.entity'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string
}
