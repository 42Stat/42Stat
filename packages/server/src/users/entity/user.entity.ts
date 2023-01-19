import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  @JoinColumn()
  intra: IntraUser;
  @Column({ nullable: true })
  refreshToken: string;
  @Column({ nullable: true })
  accessToken: string;
}
