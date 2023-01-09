import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
  @Column()
  refreshToken: string;
  @Column()
  accessToken: string;
}
