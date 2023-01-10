import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  intra: IntraUser;
  @Column()
  refreshToken: string;
  @Column()
  accessToken: string;
}
