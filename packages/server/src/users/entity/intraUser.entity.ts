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
  @Column()
  kind: string;
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
  @Column()
  blackholedAt: string;
  //   @ManyToOne(() => Coalition, (coalition) => coalition.intraUsers)
  coalitionId: number;
  @Column()
  coalitionUserId: number;
  @Column()
  totalCoalitionScore: number;
  @Column()
  passedSubjectCount: number;
}
