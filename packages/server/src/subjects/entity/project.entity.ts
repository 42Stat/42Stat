import { Subject } from './subject.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { IntraUser } from '../../users/entity/intraUser.entity';

@Entity()
export class Project {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => Subject, (subject) => subject.id)
  subjectId: number;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
  @Column()
  occurrence: number;
  @Column({ nullable: true })
  finalMark: number;
  @Column()
  status: string;
  @Column({ nullable: true })
  validated: boolean;
  @Column()
  marked: boolean;
  @Column()
  createdAt: string;
  @Column({ nullable: true })
  markedAt: string;
  @Column({ nullable: true })
  clearTime: string;
}
