import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GetCoalitionDto, GetCoalitionsDto } from './dto/getCoalition.dto';
import { Coalition } from './entity/coalition.entity';
import { CoalitionScore } from './entity/coalitionScore.entity';

interface CoalitionScoreRaw {
  score: number;
  name: string;
}

@Injectable()
export class CoalitionsService {
  constructor(
    @Inject('COALITION_REPOSITORY')
    private coalitionRepository: Repository<Coalition>,
    @Inject('COALITION_SCORE_REPOSITORY')
    private coalitionScoreRepository: Repository<CoalitionScore>
  ) {}

  async getCoalitions(): Promise<GetCoalitionsDto> {
    const data = await this.coalitionRepository.find();
    const scores: CoalitionScoreRaw[] = await this.coalitionScoreRepository
      .createQueryBuilder('coalitionScore')
      .leftJoinAndSelect('coalitionScore.intra', 'intra')
      .leftJoinAndSelect('intra.coalition', 'coalition')
      .groupBy('coalition.id')
      .select('SUM(coalitionScore.score)', 'score')
      .addSelect('coalition.name', 'name')
      .getRawMany();

    const coalitions = new GetCoalitionsDto();
    for (const coalition of data) {
      coalitions[coalition.name.toLocaleLowerCase()] = new GetCoalitionDto(
        coalition,
        scores.find((score) => score.name === coalition.name).score
      );
    }
    return coalitions;
  }
}
