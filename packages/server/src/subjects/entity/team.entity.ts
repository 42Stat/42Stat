import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { Project } from './project.entity';
import { TeamUser } from './teamUser.entity';

@Entity()
export class Team {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => Project, (project) => project.id)
  project: Project;
  @OneToMany(() => TeamUser, (teamUser) => teamUser.team)
  users: TeamUser[];
  @Column()
  name: string;
  @Column()
  status: number;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  finalMark: number;
  @Column({ nullable: true })
  locked: boolean;
  @Column({ nullable: true })
  closed: boolean;
  @Column({ nullable: true })
  lockedAt: Date;
  @Column({ nullable: true })
  closedAt: Date;
  @OneToMany(() => Evaluation, (evaluation) => evaluation.team)
  evaluations: Evaluation[];
}
