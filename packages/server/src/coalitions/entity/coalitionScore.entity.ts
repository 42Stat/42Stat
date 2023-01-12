import { IntraUser } from '../../users/entity/intraUser.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class CoalitionScore {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intra: IntraUser;
  @Column()
  score: number;
  @Column({ nullable: true })
  scoreType: string;
  @Column({ nullable: true })
  reason: string;
  @Column()
  createdAt: Date;
}
