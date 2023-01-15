import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Subject {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  slug: string;
  @Column({ nullable: true, type: 'float4' })
  averageFinalMark: number;
  @Column({ nullable: true, type: 'float4' })
  averageRetryCount: number;
  @Column({ nullable: true })
  totalClearCount: number;
  @Column({ nullable: true })
  averageClearTime: number;
  @Column({ nullable: true })
  isExam: boolean;
  @Column({ nullable: true })
  isCommonCourse: boolean;
  @OneToMany(() => Project, (project) => project.subject)
  projects: Project[];
}
