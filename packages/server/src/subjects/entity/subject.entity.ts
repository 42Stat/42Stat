import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true, type: 'float4' })
  averageFinalMark: number;
  @Column({ nullable: true, type: 'float4' })
  averageRetryCount: number;
  @Column({ nullable: true })
  averageClearTime: number;
  @Column({ nullable: true })
  isExam: boolean;
}
