import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindManyOptions, In, Repository } from 'typeorm';
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

const pageSize = 10;
@Injectable()
export class UsersService {
  constructor(
    @Inject('INTRA_USER_REPOSITORY')
    private intraUserRepository: Repository<IntraUser>,
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
    private teamRepository: Repository<Team>
  ) {}

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

    const profile = new GetUserProfileDto(user, title, parseInt(rank.rank));

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
      parseInt(rank.rank),
      evaluationCount,
      parseInt(coalitionScoreRank.rank)
    );
  }

  async getCorrectorStat(
    user: IntraUser,
    stat: CorrectorStat
  ): Promise<GetCorrectionStatDto> {
    return new GetCorrectionStatDto(stat);
  }

  async getCorrectedStat(
    user: IntraUser,
    stat: CorrectedStat
  ): Promise<GetCorrectionStatDto> {
    return new GetCorrectionStatDto(stat);
  }

  async getSubjectStat(user: IntraUser): Promise<GetSubjectStatDto> {
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
    outstanding: boolean,
    subject: string,
    page: number
  ): Promise<GetUserFeedbackDto[]> {
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
    if (outstanding === true)
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
}

// const query = `SELECT JSON_BUILD_OBJECT('evaluation', e) AS evaluation,
//   JSON_BUILD_OBJECT('subject', s) AS subject, iu.login AS corrector, (
//   SELECT JSON_BUILD_OBJECT('id', intra_user.id, 'login', login)
//   FROM intra_user
//   WHERE id = tu.intra_id
//   ) AS corrected
//   FROM evaluation e
//   LEFT JOIN team_user tu ON
//     (SELECT tu.team_id FROM intra_user iu LEFT JOIN team_user tu on iu.id = tu.intra_id WHERE tu.intra_id = ${id}) = tu.team_id
//   LEFT JOIN intra_user iu ON iu.id = e.corrector_id
//   INNER JOIN project p ON p.id = e.team_id
//   INNER JOIN subject s ON p.subject_id = s.id
//   WHERE tu.team_id = e.team_id;`;

// const results = await this.evaluationRepository.query(query);
// const teams = await this.teamUserRepository.find({
// const feedbacks: Map<number, GetUserFeedbackDto> = new Map();
// if (results !== null && results.length !== 0) {
//   for (const result of results) {
//     const evaluation = result.evaluation.evaluation;
//     const subject = result.subject.subject;
//     const corrector: string = result.corrector;
//     const corrected: string = result.corrected.login;
//     try {
//       if (feedbacks.get(evaluation.id))
//         feedbacks.get(evaluation.id).corrected.push(corrected);
//       else
//         feedbacks.set(
//           evaluation.id,
//           new GetUserFeedbackDto(evaluation, subject, corrector, corrected)
//         );
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }
// const userFeedbacks: GetUserFeedbackDto[] = [];
// for (const [, value] of feedbacks) userFeedbacks.push(value);

// return userFeedbacks;
