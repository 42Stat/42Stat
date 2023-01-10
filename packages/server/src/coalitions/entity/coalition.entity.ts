import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Coalition {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  imageUrl: string;
  @Column()
  color: string;
  @Column({ default: 0 })
  activeUserCount: number;
  @Column({ default: 0 })
  subjectPassedCount: number;
  @Column({ default: 0 })
  evaluationCount: number;
  @Column({ default: 0 })
  blackholedUserCount: number;
}
