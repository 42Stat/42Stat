import { Column, Entity, OneToMany } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class Achievement {
  @Column()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  tier: string;
  @Column()
  kind: string;
  @Column()
  image: string;
}

@Entity()
export class AchievementUser {
  @OneToMany(() => Achievement, (achievement) => achievement.id)
  achievementId: number;
  @OneToMany(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
}
