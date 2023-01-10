import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IntraUser } from '../../users/entity/intraUser.entity';
import { Team } from './team.entity';

@Entity()
export class TeamUser {
  @PrimaryColumn()
  id: number;
  @ManyToOne(() => Team, (team) => team.id)
  team: Team;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intra: IntraUser;
}
