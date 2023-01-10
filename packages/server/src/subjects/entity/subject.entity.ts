import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  averageFinalMark: string;
  @Column({ nullable: true })
  averageRetryCount: number;
  @Column({ nullable: true })
  averageClearTime: number;
  @Column({ nullable: true })
  isExam: boolean;
}
