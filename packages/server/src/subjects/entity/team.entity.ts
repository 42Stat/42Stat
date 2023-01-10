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
  @Column({ nullable: true })
  finalMark: number;
  @Column({ nullable: true })
  locked: boolean;
  @Column({ nullable: true })
  closed: boolean;
  @Column({ nullable: true })
  lockedAt: string;
  @Column({ nullable: true })
  closedAt: string;
}
