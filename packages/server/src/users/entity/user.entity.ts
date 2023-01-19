import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id, { nullable: true })
  @JoinColumn()
  intra: IntraUser;
  @Column({ nullable: true })
  refreshToken: string;
}
