import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class SubjectStat {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  @JoinColumn()
  intra: IntraUser;
  @Column({ default: 0, type: 'float4' })
  averageFinalMark: number;
  @Column({ default: 0 })
  averageClearTime: number;
  @Column({ default: 0 })
  passedCount: number;
  @Column({ default: 0 })
  totalRetryCount: number;
}
