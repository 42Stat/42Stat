import { IntraUser } from '../../users/entity/intraUser.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Subject } from './subject.entity';
import { Team } from './team.entity';

@Entity()
export class Evaluation {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  correctorId: number;
  @ManyToOne(() => Subject, (subject) => subject.id)
  subjectId: number;
  @Column()
  comment: string;
  @Column()
  feedback: string;
  @Column()
  finalMark: number;
  @Column()
  positive: boolean;
  @Column()
  flag: number;
  @Column()
  beginAt: Date;
  @Column()
  end_at: Date;
  @Column()
  rating: number;
  @ManyToOne(() => Team, (team) => team.id)
  teamId: number;
}
