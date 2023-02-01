import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { Project } from '../../subjects/entity/project.entity';

@Entity()
export class SubjectStat {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  @JoinColumn()
  intra: IntraUser;
  @Column({ default: 0, type: 'real' })
  averageFinalMark: number;
  @Column({ default: 0 })
  averageClearTime: number;
  @Column({ default: 0 })
  passedCount: number;
  @Column({ default: 0 })
  totalRetryCount: number;
  @ManyToOne(() => Project, (project) => project.id, { nullable: true })
  lastProject: Project;
}
