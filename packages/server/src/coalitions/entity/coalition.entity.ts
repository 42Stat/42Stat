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
  @Column()
  activeUserCount: number;
  @Column()
  subjectPassedCount: number;
  @Column()
  evaluationCount: number;
  @Column()
  blackholedUserCount: number;
}
