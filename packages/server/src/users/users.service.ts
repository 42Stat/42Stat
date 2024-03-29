import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DataSource,
  FindManyOptions,
  In,
  Like,
  QueryRunner,
  Repository,
} from 'typeorm';
import { GetUserProfileDto } from './dto/getUserProfile.dto';
import { CorrectedStat } from './entity/correctedStat.entity';
import { CorrectorStat } from './entity/correctorStat.entity';
import { IntraUser } from './entity/intraUser.entity';
import { SubjectStat } from './entity/subjectStat.entity';
import { TitleUser } from './entity/title.entity';
import {
  GetUserSummaryDto,
  GetCorrectionStatDto,
  GetOverallDto,
  GetSubjectStatDto,
} from './dto/getUserSummary.dto';
import { Evaluation } from '../subjects/entity/evaluation.entity';
import { Project } from '../subjects/entity/project.entity';
import { GetUserSubjectDto } from '../subjects/dto/getSubject.dto';
import { GetUserFeedbackDto } from './dto/getUserFeedbacks.dto';
import { TeamUser } from '../subjects/entity/teamUser.entity';
import { Team } from '../subjects/entity/team.entity';
import { User } from './entity/user.entity';
import { GetUserSearchDto } from './dto/getUserSearch.dto';

const pageSize = 10;
@Injectable()
export class UsersService {
  constructor(
    @Inject('INTRA_USER_REPOSITORY')
    private intraUserRepository: Repository<IntraUser>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('CORRECTED_STAT_REPOSITORY')
    private correctedStatRepository: Repository<CorrectedStat>,
    @Inject('TITLE_USER_REPOSITORY')
    private titleUserRepository: Repository<TitleUser>,
    @Inject('CORRECTOR_STAT_REPOSITORY')
    private correctorStatRepository: Repository<CorrectorStat>,
    @Inject('SUBJECT_STAT_REPOSITORY')
    private subjectStatRepository: Repository<SubjectStat>,
    @Inject('EVALUATION_REPOSITORY')
    private evaluationRepository: Repository<Evaluation>,
    @Inject('TEAM_USER_REPOSITORY')
    private teamUserRepository: Repository<TeamUser>,
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
    @Inject('TEAM_REPOSITORY')
    private teamRepository: Repository<Team>,
    @Inject('DATA_SOURCE') private dataSource: DataSource
  ) {}

  async getUserByGoogleId(id: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { id: String(id) },
      relations: ['intra'],
    });
    return user;
  }

  async getUserByIntraId(id: number): Promise<IntraUser> {
    const user: IntraUser = await this.intraUserRepository.findOne({
      where: { id: id },
      // TODO: relations: ['user'],
    });
    return user;
  }

  async saveUser(user: User): Promise<User> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    let newUser = null;

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      newUser = await queryRunner.manager.save(User, user);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    if (newUser === null) throw new ServiceUnavailableException();

    return newUser;
  }

  async saveIntraUser(user: User, intraUser: IntraUser): Promise<User> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    let newUser = user;
    newUser.intra = intraUser;

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const isExistUser = await queryRunner.manager.exists(User, {
        where: { id: user.id },
      });
      if (isExistUser === false)
        throw new BadRequestException('User not exist');

      await queryRunner.manager.save(User, newUser);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      newUser = null;
    } finally {
      await queryRunner.release();
    }
    if (newUser === null) throw new ServiceUnavailableException();

    return newUser;
  }

  // ANCHOR: /profile
  async getUserProfile(id: number): Promise<GetUserProfileDto> {
    const user: IntraUser = await this.intraUserRepository.findOne({
      where: { id: id },
      relations: {
        coalition: true,
        titleUsers: { title: true },
      },
    });
    if (user === null)
      throw new NotFoundException(`User with id ${id} not found`);

    let title = null;
    for (const titleUser of user.titleUsers) {
      if (titleUser.selected === true) {
        title = titleUser.title;
        break;
      }
    }

    const rank = await this.intraUserRepository
      .createQueryBuilder('intra_user')
      .select(`RANK() OVER (ORDER BY intra_user.level DESC) as rank`)
      .where('intra_user.id = :id', { id: id })
      .getRawOne();

    const profile = new GetUserProfileDto(user, title, parseInt(rank?.rank));

    return profile;
  }

  // ANCHOR: /summary
  async getOverall(
    user: IntraUser,
    evaluationCount: number
  ): Promise<GetOverallDto> {
    const rank = await this.intraUserRepository
      .createQueryBuilder('intra_user')
      .select(`RANK() OVER (ORDER BY intra_user.level DESC) as rank`)
      .where('intra_user.id = :id', { id: user.id })
      .getRawOne();
    const coalitionScoreRank = await this.intraUserRepository
      .createQueryBuilder('intra_user')
      .select(
        `RANK() OVER (ORDER BY intra_user.total_coalition_score DESC) as rank`
      )
      .where('intra_user.id = :id', { id: user.id })
      .getRawOne();
    return new GetOverallDto(
      user,
      parseInt(rank?.rank),
      evaluationCount,
      parseInt(coalitionScoreRank?.rank)
    );
  }

  private async getCorrectorStat(
    user: IntraUser,
    stat: CorrectorStat
  ): Promise<GetCorrectionStatDto> {
    return new GetCorrectionStatDto(stat);
  }

  private async getCorrectedStat(
    user: IntraUser,
    stat: CorrectedStat
  ): Promise<GetCorrectionStatDto> {
    return new GetCorrectionStatDto(stat);
  }

  private async getSubjectStat(user: IntraUser): Promise<GetSubjectStatDto> {
    const stat: SubjectStat = await this.subjectStatRepository.findOne({
      where: { intra: user },
      relations: ['lastProject', 'lastProject.subject'],
    });

    return new GetSubjectStatDto(stat);
  }

  async getUserSummary(id: number): Promise<GetUserSummaryDto> {
    const user: IntraUser = await this.intraUserRepository.findOne({
      where: { id: id },
    });
    if (user === null)
      throw new NotFoundException(`User with id ${id} not found`);
    const correctorStat: CorrectorStat =
      await this.correctorStatRepository.findOne({
        where: { intra: user },
      });
    const correctedStat: CorrectedStat =
      await this.correctedStatRepository.findOne({
        where: { intra: user },
      });
    const totalEvaluationCount =
      correctedStat && correctorStat
        ? correctorStat.evaluationCount + correctedStat.evaluationCount
        : 0;

    const summary: GetUserSummaryDto = new GetUserSummaryDto();
    const promises = [
      this.getOverall(user, totalEvaluationCount),
      this.getCorrectorStat(user, correctorStat),
      this.getCorrectedStat(user, correctedStat),
      this.getSubjectStat(user),
    ];
    await Promise.all(promises)
      .then((values) => {
        summary.overall = values[0] as GetOverallDto;
        summary.correctorStat = values[1] as GetCorrectionStatDto;
        summary.correctedStat = values[2] as GetCorrectionStatDto;
        summary.subjectStat = values[3] as GetSubjectStatDto;
      })
      .catch((err) => {
        console.log(err);
      });
    return summary;
  }

  // ANCHOR: /subjects
  async getUserSubjects(
    id: number,
    sort: string,
    page: number
  ): Promise<GetUserSubjectDto[]> {
    if (!Number.isInteger(page))
      throw new BadRequestException('page는 정수여야 합니다.');
    if (page < 1) throw new BadRequestException('page는 1 이상이어야 합니다.');

    const projectsFindOptions: FindManyOptions<Project> = {
      where: { intra: { id: id } },
      relations: ['subject', 'intra'],
      order: { markedAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    };

    // 정렬 방식
    // TODO: 추후에 정렬 가능 방식만 사용할 수 있도록 수정
    // TODO: 방식 별 정렬 순서를 따로 지정할 수 있도록 수정
    if (sort) {
      if (sort.charAt(0) === '-')
        projectsFindOptions.order = { [sort.substring(1)]: 'DESC' };
      else projectsFindOptions.order = { [sort]: 'ASC' };
    }

    const projects: Project[] = await this.projectRepository.find(
      projectsFindOptions
    );
    const subjects = [];
    for (const project of projects) {
      subjects.push(new GetUserSubjectDto(project));
    }
    return subjects;
  }

  // ANCHOR: /feedbacks
  async getUserFeedbacks(
    id: number,
    type: string,
    outstanding: string,
    subject: string,
    page: number
  ): Promise<GetUserFeedbackDto[]> {
    if (outstanding !== 'true' && outstanding !== 'false' && outstanding)
      throw new BadRequestException(
        'outstanding은 true 또는 false여야 합니다.'
      );
    const outstandingBool = outstanding === 'true' ? true : false;
    if (!Number.isInteger(page))
      throw new BadRequestException('page는 정수여야 합니다.');
    if (page < 1) throw new BadRequestException('page는 1 이상이어야 합니다.');

    let teamUserFindOptions: FindManyOptions<TeamUser>;
    // 평가자 / 피평가자 구분
    if (type === 'as-corrected')
      teamUserFindOptions = {
        where: { intra: { id: id } },
        relations: ['intra', 'team'],
      };
    else if (type === 'as-corrector')
      teamUserFindOptions = {
        where: { team: { evaluations: { corrector: { id: id } } } },
        relations: ['team', 'team.evaluations', 'team.evaluations.corrector'],
      };
    else throw new BadRequestException('Invalid type');

    // 팀 찾기
    const teamUsers = await this.teamUserRepository.find(teamUserFindOptions);
    const teamIds = [];
    for (const teamUser of teamUsers) teamIds.push(teamUser.team.id);

    const evaluationFindOptions: FindManyOptions<Evaluation> = {
      where: { team: { id: In(teamIds) } },
      relations: [
        'team',
        'team.users',
        'team.users.intra',
        'corrector',
        'team.project',
        'team.project.subject',
      ],
      order: { id: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    };
    // 아웃스탠딩 필터링
    if (outstandingBool === true)
      Object.assign(evaluationFindOptions.where, { flag: 9 });
    // TODO: Read 속도 최적화를 위해, subject id로 찾도록 수정
    // 서브젝트 필터링
    if (subject !== undefined)
      Object.assign(evaluationFindOptions.where, {
        team: { project: { subject: { name: subject } } },
      });

    const evaluations = await this.evaluationRepository.find(
      evaluationFindOptions
    );
    const feedbacks = [];
    for (const evaluation of evaluations)
      feedbacks.push(new GetUserFeedbackDto(evaluation));

    return feedbacks;
  }

  async searchUser(login: string, page = '1'): Promise<GetUserSearchDto[]> {
    const pageNumber = Number(page);
    if (!Number.isInteger(pageNumber) || pageNumber < 1)
      throw new BadRequestException('page는 1 이상의 정수여야 합니다.');
    if (login === '') return [];

    const users = await this.intraUserRepository.find({
      where: { login: Like(`%${login}%`) },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    const result: GetUserSearchDto[] = [];
    for (const user of users) result.push(new GetUserSearchDto(user));

    return result;
  }
}
