import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Team {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => Project, (project) => project.id)
  project: Project;
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
}
