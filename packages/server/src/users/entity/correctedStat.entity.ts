import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class CorrectedStat {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  @JoinColumn()
  intra: IntraUser;
  @Column({ default: 0, type: 'float4' })
  averageMark: number;
  @Column({ default: 0 })
  evaluationCount: number;
  @Column({ default: 0, type: 'float4' })
  averageEvaluationCount: number;
  @Column({ default: 0 })
  outstandingCount: number;
  @Column({ default: 0 })
  averageBeginTime: number;
  @Column({ default: 0 })
  averageDuration: number;
  @Column({ default: 0, type: 'float4' })
  averageFeedbackLength: number;
}
