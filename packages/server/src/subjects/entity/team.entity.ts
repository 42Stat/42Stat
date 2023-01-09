import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Team {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => Project, (project) => project.id)
  projectId: number;
  @Column()
  name: string;
  @Column()
  status: number;
  @Column()
  createdAt: string;
  @Column()
  finalMark: number;
  @Column()
  locked: boolean;
  @Column()
  closed: boolean;
  @Column()
  lockedAt: string;
  @Column()
  closedAt: string;
}
