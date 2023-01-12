import { Subject } from './subject.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { IntraUser } from '../../users/entity/intraUser.entity';
import { Team } from './team.entity';

@Entity()
export class Project {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => Subject, (subject) => subject.id)
  subject: Subject;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intra: IntraUser;
  @OneToMany(() => Team, (team) => team.project)
  teams: Team[];
  @Column()
  occurrence: number;
  @Column({ nullable: true })
  finalMark: number;
  @Column()
  status: number;
  @Column({ nullable: true })
  validated: boolean;
  @Column()
  marked: boolean;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  markedAt: Date;
  @Column({ nullable: true })
  clearTime: number;
}
