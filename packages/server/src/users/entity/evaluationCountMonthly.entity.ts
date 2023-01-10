import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class MonthlyEvaluationCount {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intra: IntraUser;
  @Column()
  month: number;
  @Column()
  year: number;
  @Column({ default: 0 })
  count: number;
}
