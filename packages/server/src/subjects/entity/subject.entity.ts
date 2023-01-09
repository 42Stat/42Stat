import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  averageFinalMark: string;
  @Column()
  averageRetryCount: number;
  @Column()
  averageClearTime: number;
  @Column()
  isExam: boolean;
}
