import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

Entity();
export class CorrectorStat {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
  @Column()
  averageMark: number;
  @Column()
  totalEvaluationCount: number;
  @Column()
  averageEvaluationCount: number;
  @Column()
  outstandingCount: number;
  @Column()
  averageBeginTime: number;
  @Column()
  averageDuration: number;
  @Column()
  averageCommentLength: number;
}
