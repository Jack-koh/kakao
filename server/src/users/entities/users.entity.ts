import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  user_no: number;

  @Column()
  user_email: string;

  @Column()
  user_password: string;

  @Column({ default: true })
  user_name: string;

  @Column({ default: true })
  reg_date: number;
}
