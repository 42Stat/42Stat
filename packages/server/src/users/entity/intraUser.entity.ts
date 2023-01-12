import { Coalition } from '../../coalitions/entity/coalition.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { AchievementUser } from './achievement.entity';
import { Project } from 'src/subjects/entity/project.entity';

@Entity()
export class IntraUser {
  @PrimaryColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  login: string;
  @Column()
  displayName: string;
  @Column({ nullable: true })
  imageUrl: string;
  @Column()
  correctionPoint: number;
  @Column()
  wallet: number;
  @Column()
  active: boolean;
  @Column()
  grade: string;
  @Column({ type: 'float4' })
  level: number;
  @Column()
  generation: number;
  @Column()
  beginAt: Date;
  @Column()
  updatedAt: Date;
  @Column({ nullable: true })
  blackholedAt: Date;
  @ManyToOne(() => Coalition, (coalition) => coalition.id)
  coalition: Coalition;
  @Column()
  coalitionUserId: number;
  @Column({ default: 0 })
  totalCoalitionScore: number;
  @Column({ default: 0 })
  passedSubjectCount: number;
}
