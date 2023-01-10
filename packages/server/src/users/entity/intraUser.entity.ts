import { Coalition } from '../../coalitions/entity/coalition.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

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
  @Column()
  level: number;
  @Column()
  generation: number;
  @Column()
  beginAt: string;
  @Column()
  updatedAt: string;
  @Column({ nullable: true })
  blackholedAt: string;
  @ManyToOne(() => Coalition, (coalition) => coalition.id)
  coalitionId: number;
  @Column()
  coalitionUserId: number;
  @Column({ default: 0 })
  totalCoalitionScore: number;
  @Column({ default: 0 })
  passedSubjectCount: number;
}
