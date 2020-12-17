import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn({type: 'integer', unsigned: true})
  id: number

  @Column({type: 'varchar', length: 255, nullable: false})
  name: string

  @Column({type: 'varchar', length: 255, nullable: false})
  email: string

  @Column({type: 'varchar', length: 255, nullable: false})
  password: string
}