import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from './intraUser.entity';

@Entity()
export class Title {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
}

@Entity()
export class TitleUser {
  @ManyToOne(() => Title, (title) => title.id)
  titleId: number;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
  @Column()
  selected: boolean;
}