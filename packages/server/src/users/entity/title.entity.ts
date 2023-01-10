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
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => Title, (title) => title.id)
  title: Title;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intra: IntraUser;
  @Column()
  selected: boolean;
}
