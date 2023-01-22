import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { GetLeaderboardDto } from './dto/getLeaderboard.dto';
import { IntraUser } from '../users/entity/intraUser.entity';

const pageSize = 10;
@Injectable()
export class LeaderboardService {
  constructor(
    @Inject('INTRA_USER_REPOSITORY')
    private intraUsersRepository: Repository<IntraUser>
  ) {}

  async getLeaderboard(
    sort = 'level',
    generation: number = null,
    coalition: string = null,
    page = 1
  ): Promise<GetLeaderboardDto[]> {
    if (!Number.isInteger(page))
      throw new BadRequestException('page는 정수여야 합니다.');
    if (page < 1) throw new BadRequestException('page는 1 이상이어야 합니다.');
    const intraUserFindOptions: FindManyOptions<IntraUser> = {
      where: {},
      order: {},
      relations: [],
      skip: (page - 1) * pageSize,
      take: pageSize,
    };

    // TODO: 정렬 기준에 있는 것들만 허용
    if (sort.charAt(0) === '-')
      intraUserFindOptions.order = { [sort.substring(1)]: 'ASC' };
    else intraUserFindOptions.order = { [sort]: 'DESC' };

    coalition = coalition
      ? coalition.at(0).toUpperCase() + coalition.slice(1).toLocaleLowerCase()
      : null;
    // TODO: 둘 다 걸 수 있게 할 건지?
    if (generation) intraUserFindOptions.where['generation'] = generation;
    if (coalition)
      intraUserFindOptions.where['coalition'] = { name: coalition };

    console.log(intraUserFindOptions);

    const users = await this.intraUsersRepository.find(intraUserFindOptions);

    const leaderboard: GetLeaderboardDto[] = [];
    users.map((user) => {
      leaderboard.push(new GetLeaderboardDto(user));
    });
    return leaderboard;
  }
}
