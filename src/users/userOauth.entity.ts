import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserOauth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  oauthID: string;
}
