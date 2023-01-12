import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class Achievement {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  tier: string;
  @Column()
  kind: string;
  @Column({ nullable: true })
  imageUrl: string;
}

@Entity()
export class AchievementUser {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => Achievement, (achievement) => achievement.id)
  achievement: Achievement;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intra: IntraUser;
}
