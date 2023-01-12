import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class MonthlyCoalitionScore {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intra: IntraUser;
  @Column()
  month: number;
  @Column()
  year: number;
  @Column({ default: 0 })
  score: number;
}
