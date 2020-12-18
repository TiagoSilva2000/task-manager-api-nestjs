import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('token')
export default class Token {
  @PrimaryGeneratedColumn()
  id: number
  
}