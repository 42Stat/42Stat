import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class MonthlyEvaluationCount {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
  @Column()
  month: number;
  @Column()
  year: number;
  @Column()
  count: number;
}
