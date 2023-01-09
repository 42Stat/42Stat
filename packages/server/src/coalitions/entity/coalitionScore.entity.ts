import { IntraUser } from 'src/users/entity/intraUser.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class CoalitionScore {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
  @Column()
  score: number;
  @Column()
  scoreType: string;
  @Column()
  reason: string;
  @Column()
  createdAt: Date;
  @Column()
  coalitionId: number;
}
