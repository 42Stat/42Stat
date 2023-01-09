import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
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
  @OneToMany(() => Title, (title) => title.id)
  titleId: number;
  @OneToMany(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
  @Column()
  selected: boolean;
}
