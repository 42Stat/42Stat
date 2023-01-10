import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

Entity();
export class CorrectorStat {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  intra: IntraUser;
  @Column({ default: 0 })
  averageMark: number;
  @Column({ default: 0 })
  totalEvaluationCount: number;
  @Column({ default: 0 })
  averageEvaluationCount: number;
  @Column({ default: 0 })
  outstandingCount: number;
  @Column({ default: 0 })
  averageBeginTime: number;
  @Column({ default: 0 })
  averageDuration: number;
  @Column({ default: 0 })
  averageCommentLength: number;
}
