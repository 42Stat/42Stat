import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class SubjectStat {
  @PrimaryColumn()
  id: number;
  @OneToOne(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
  @Column()
  averageFinalMark: number;
  @Column()
  averageClearTime: number;
  @Column()
  passedCount: number;
  @Column()
  totalRetryCount: number;
  //   @OneToOne(() => Project, (project) => project.id)
  lastProjectId: number;
}
