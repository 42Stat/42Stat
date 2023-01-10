import { Project } from '../../subjects/entity/project.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class SubjectStat {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
  @Column({ default: 0 })
  averageFinalMark: number;
  @Column({ default: 0 })
  averageClearTime: number;
  @Column({ default: 0 })
  passedCount: number;
  @Column({ default: 0 })
  totalRetryCount: number;
  @ManyToOne(() => Project, (project) => project.id)
  lastProjectId: number;
}
