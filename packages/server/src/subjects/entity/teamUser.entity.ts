import { Entity, ManyToOne } from 'typeorm';
import { IntraUser } from '../../users/entity/intraUser.entity';
import { Team } from './team.entity';

@Entity()
export class TeamUser {
  @ManyToOne(() => Team, (team) => team.id)
  teamId: number;
  @ManyToOne(() => IntraUser, (intraUser) => intraUser.id)
  intraId: number;
}
