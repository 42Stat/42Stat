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
  @Column({ nullable: true })
  comment: string;
  @Column({ nullable: true })
  feedback: string;
  @Column({ nullable: true })
  finalMark: number;
  @Column({ nullable: true })
  positive: boolean;
  @Column({ nullable: true })
  flag: number;
  @Column()
  beginAt: Date;
  @Column({ nullable: true })
  end_at: Date;
  @Column({ nullable: true })
  rating: number;
  @ManyToOne(() => Team, (team) => team.id)
  teamId: number;
}
