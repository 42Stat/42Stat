import { Inject, Injectable } from '@nestjs/common';

import { Subject } from './subjects/entity/subject.entity';
import { DataSource } from 'typeorm';
import { Coalition } from './coalitions/entity/coalition.entity';
import { CoalitionScore } from './coalitions/entity/coalitionScore.entity';

import {
  Achievement,
  AchievementUser,
} from './users/entity/achievement.entity';
import { MonthlyCoalitionScore } from './users/entity/monthlyCoalitionScore.entity';
import { CorrectedStat } from './users/entity/correctedStat.entity';
import { CorrectorStat } from './users/entity/correctorStat.entity';
import { MonthlyEvaluationCount } from './users/entity/monthlyEvaluationCount.entity';
import { IntraUser } from './users/entity/intraUser.entity';
import { Title, TitleUser } from './users/entity/title.entity';
import { Project } from './subjects/entity/project.entity';
import { Team } from './subjects/entity/team.entity';
import { TeamUser } from './subjects/entity/teamUser.entity';
import { Evaluation } from './subjects/entity/evaluation.entity';
import { SubjectStat } from './users/entity/subjectStat.entity';

@Injectable()
export class AppService {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  public async seed() {
    const coalition1: Coalition = {
      id: 85,
      name: 'Gun',
      imageUrl: 'https://cdn.intra.42.fr/coalition/image/85/gun-svg-svg.svg',
      color: '#FFC221',
      activeUserCount: 2,
      subjectPassedCount: 2,
      evaluationCount: 2,
      blackholedUserCount: 2,
    };

    const coalition2: Coalition = {
      id: 86,
      name: 'Gon',
      imageUrl: 'https://cdn.intra.42.fr/coalition/image/86/gon-svg-svg.svg',
      color: '#FFC221',
      activeUserCount: 2,
      subjectPassedCount: 2,
      evaluationCount: 2,
      blackholedUserCount: 2,
    };

    const intraUser1: IntraUser = {
      id: 99947,
      email: 'jaham@student.42seoul.kr',
      login: 'jaham',
      displayName: 'Jaewon Ham',
      imageUrl:
        'https://cdn.intra.42.fr/users/cfc5b84fa9130d86b32acec4aae7889f/jaham.jpg',
      correctionPoint: 30,
      wallet: 2000,
      active: true,
      grade: 'member',
      level: 11.38,
      generation: 5,
      beginAt: new Date('2021-11-08T01:00:00.000Z'),
      updatedAt: new Date('2023-01-11T08:41:50.165Z'),
      blackholedAt: null,
      coalition: coalition1,
      coalitionUserId: 69674,
      totalCoalitionScore: 100000,
      passedSubjectCount: 29,
      totalEvaluationCount: 100,
      titleUsers: [],
      achievementUsers: [],
      monthlyEvaluationCounts: [],
      monthlyCoalitionScores: [],
      teamUsers: [],
      projects: [],
    };

    const intraUser2: IntraUser = {
      id: 110730,
      email: 'salee2@student.42seoul.kr',
      login: 'salee2',
      displayName: 'Sanghoon Lee',
      imageUrl:
        'https://cdn.intra.42.fr/users/064bbaeae582e63b1e78e45f9152e431/salee2.jpg',
      correctionPoint: 11,
      wallet: 100,
      active: true,
      grade: 'learner',
      level: 3.4,
      generation: 7,
      beginAt: new Date('2022-07-04T01:00:00.000Z'),
      updatedAt: new Date('2023-01-11T08:41:50.165Z'),
      blackholedAt: new Date('2023-04-23T01:00:00.000Z'),
      coalition: coalition1,
      coalitionUserId: 110730,
      totalCoalitionScore: 500000,
      totalEvaluationCount: 10,
      passedSubjectCount: 10,
      titleUsers: [],
      achievementUsers: [],
      monthlyEvaluationCounts: [],
      monthlyCoalitionScores: [],
      teamUsers: [],
      projects: [],
    };

    const intraUser3: IntraUser = {
      id: 99953,
      email: 'jisookim@student.42seoul.kr',
      login: 'jisookim',
      displayName: 'Jisoo Kim',
      imageUrl:
        'https://cdn.intra.42.fr/users/033dd0f728a397876e10c2b7264e20c6/jisookim.jpg',
      correctionPoint: 3,
      wallet: 1415,
      active: true,
      grade: 'learner',
      level: 5.432,
      generation: 5,
      beginAt: new Date('2021-11-08T01:00:00.000Z'),
      updatedAt: new Date('2023-01-13T05:53:57.021Z'),
      blackholedAt: new Date('2023-03-28T01:00:00.000Z'),
      coalition: coalition2,
      coalitionUserId: 69719,
      totalEvaluationCount: 10,
      totalCoalitionScore: 100000,
      passedSubjectCount: 29,
      titleUsers: [],
      achievementUsers: [],
      monthlyEvaluationCounts: [],
      monthlyCoalitionScores: [],
      teamUsers: [],
      projects: [],
    };

    const intraUser4: IntraUser = {
      id: 99733,
      login: 'dha',
      email: 'dha@student.42seoul.kr',
      displayName: 'Donghun Ha',
      imageUrl: null,
      correctionPoint: 0,
      wallet: 0,
      active: true,
      grade: 'member',
      level: 11.04,
      generation: 5,
      beginAt: new Date('2021-11-08T01:00:00.000Z'),
      updatedAt: new Date('2023-01-13T05:53:57.021Z'),
      blackholedAt: new Date('2023-03-28T01:00:00.000Z'),
      coalition: coalition2,
      coalitionUserId: 69515,
      totalEvaluationCount: 10,
      totalCoalitionScore: 100000,
      passedSubjectCount: 29,
      titleUsers: [],
      achievementUsers: [],
      monthlyEvaluationCounts: [],
      monthlyCoalitionScores: [],
      teamUsers: [],
      projects: [],
    };

    // const user1: User = {
    //   id:
    //   intra: null,
    //   refreshToken: null,
    // };

    const achievement1: Achievement = {
      id: 1,
      name: '코딩을 시작하다',
      description: '코딩을 시작하다',
      tier: '1',
      kind: 'subject',
      imageUrl: null,
    };

    const achievementUser1: AchievementUser = {
      id: 1,
      achievement: achievement1,
      intra: intraUser1,
    };

    const title1: Title = {
      id: 1,
      name: '%login, 프론트엔드',
    };

    const title2: Title = {
      id: 2,
      name: '%login, 테스터',
    };

    const titleUser1: TitleUser = {
      id: 1,
      title: title1,
      intra: intraUser1,
      selected: true,
    };

    const titleUser2: TitleUser = {
      id: 2,
      title: title2,
      intra: intraUser2,
      selected: true,
    };

    const monthlyCoalitionScore1: MonthlyCoalitionScore = {
      id: 1,
      intra: intraUser1,
      month: 12,
      year: 2022,
      score: 70001,
    };
    const monthlyCoalitionScore2: MonthlyCoalitionScore = {
      id: 2,
      intra: intraUser2,
      month: 12,
      year: 2022,
      score: 7000,
    };
    const monthlyCoalitionScore3: MonthlyCoalitionScore = {
      id: 3,
      intra: intraUser3,
      month: 12,
      year: 2022,
      score: 7000,
    };
    const monthlyCoalitionScore4: MonthlyCoalitionScore = {
      id: 4,
      intra: intraUser3,
      month: 12,
      year: 2022,
      score: 7000,
    };

    const monthlyCoalitionScore5: MonthlyCoalitionScore = {
      id: 5,
      intra: intraUser3,
      month: 11,
      year: 2022,
      score: 8000,
    };

    const correctedStat1: CorrectedStat = {
      id: 1,
      intra: intraUser1,
      averageMark: 80.51,
      evaluationCount: 100,
      averageEvaluationCount: 8.31,
      outstandingCount: 10,
      averageBeginTime: 50000000,
      averageDuration: 30000000,
      averageFeedbackLength: 143.5,
    };

    const correctedStat2: CorrectedStat = {
      id: 2,
      intra: intraUser2,
      averageMark: 80.51,
      evaluationCount: 100,
      averageEvaluationCount: 8.31,
      outstandingCount: 10,
      averageBeginTime: 100000000,
      averageDuration: 30000000,
      averageFeedbackLength: 143.5,
    };

    const correctorStat1: CorrectorStat = {
      id: 1,
      intra: intraUser1,
      averageMark: 80.51,
      evaluationCount: 100,
      averageEvaluationCount: 8.31,
      outstandingCount: 10,
      averageBeginTime: 100000000,
      averageDuration: 30000000,
      averageCommentLength: 143.5,
    };

    const correctorStat2: CorrectorStat = {
      id: 2,
      intra: intraUser2,
      averageMark: 80.51,
      evaluationCount: 100,
      averageEvaluationCount: 8.31,
      outstandingCount: 10,
      averageBeginTime: 100000000,
      averageDuration: 30000000,
      averageCommentLength: 143.5,
    };

    const monthlyEvaluationCount1: MonthlyEvaluationCount = {
      id: 1,
      intra: intraUser1,
      month: 12,
      year: 2022,
      count: 10,
    };

    const monthlyEvaluationCount2: MonthlyEvaluationCount = {
      id: 2,
      intra: intraUser1,
      month: 11,
      year: 2022,
      count: 20,
    };

    const coalitionScore1: CoalitionScore = {
      id: 1,
      intra: intraUser1,
      score: 42,
      scoreType: 'subject',
      reason: 'evaluated someone',
      createdAt: new Date(),
    };

    const coalitionScore2: CoalitionScore = {
      id: 2,
      intra: intraUser2,
      score: 4200,
      scoreType: 'subject',
      reason: 'evaluated someone',
      createdAt: new Date(),
    };

    const coalitionScore3: CoalitionScore = {
      id: 3,
      intra: intraUser2,
      score: 420,
      scoreType: 'subject',
      reason: 'evaluated someone',
      createdAt: new Date(),
    };

    const coalitionScore4: CoalitionScore = {
      id: 4,
      intra: intraUser3,
      score: 4200,
      scoreType: 'subject',
      reason: 'evaluated someone',
      createdAt: new Date(),
    };
    const coalitionScore5: CoalitionScore = {
      id: 5,
      intra: intraUser3,
      score: 420,
      scoreType: 'subject',
      reason: 'evaluated someone',
      createdAt: new Date(),
    };
    const subject1: Subject = {
      id: 1,
      name: '과제',
      slug: '42cursus-ft_printf',
      averageFinalMark: 80.51,
      averageRetryCount: 2.3,
      averageClearTime: 24.5 * 24 * 60 * 60 * 1000,
      isExam: false,
      totalClearCount: 100,
      isCommonCourse: true,
      projects: [],
    };

    const subject2: Subject = {
      id: 2,
      name: '과제2',
      slug: 'ft_transcendence',
      averageFinalMark: 80.51,
      averageRetryCount: 2.3,
      averageClearTime: 24.5 * 24 * 60 * 60 * 1000,
      isExam: false,
      totalClearCount: 130,
      isCommonCourse: true,
      projects: [],
    };

    const project1: Project = {
      id: 1,
      subject: subject1,
      intra: intraUser1,
      occurrence: 1,
      finalMark: 100,
      status: 2,
      validated: true,
      marked: true,
      createdAt: new Date(),
      markedAt: new Date(),
      clearTime: 24.5 * 24 * 60 * 60 * 1000,
      teams: [],
    };

    const project2: Project = {
      id: 2,
      subject: subject2,
      intra: intraUser1,
      occurrence: 1,
      finalMark: 100,
      status: 2,
      validated: true,
      marked: true,
      createdAt: new Date(),
      markedAt: new Date(),
      clearTime: 24.5 * 24 * 60 * 60 * 1000,
      teams: [],
    };

    const project3: Project = {
      id: 3,
      subject: subject1,
      intra: intraUser2,
      occurrence: 1,
      finalMark: 100,
      status: 2,
      validated: true,
      marked: true,
      createdAt: new Date(),
      markedAt: new Date(),
      clearTime: 24.5 * 24 * 60 * 60 * 1000,
      teams: [],
    };

    const team1: Team = {
      id: 1,
      project: project1,
      name: "jaham's group-1",
      status: 1,
      createdAt: new Date(),
      finalMark: 100,
      locked: true,
      closed: true,
      lockedAt: new Date(),
      closedAt: new Date(),
      users: [],
      evaluations: [],
    };

    const team2: Team = {
      id: 2,
      project: project2,
      name: "jaham's group-2",
      status: 1,
      createdAt: new Date(),
      finalMark: 100,
      locked: true,
      closed: true,
      lockedAt: new Date(),
      closedAt: new Date(),
      users: [],
      evaluations: [],
    };

    const team3: Team = {
      id: 3,
      project: project3,
      name: "jaham's group-3",
      status: 1,
      createdAt: new Date(),
      finalMark: 100,
      locked: true,
      closed: true,
      lockedAt: new Date(),
      closedAt: new Date(),
      users: [],
      evaluations: [],
    };

    const teamUser1: TeamUser = {
      id: 1,
      team: team1,
      intra: intraUser1,
    };

    const teamUser2: TeamUser = {
      id: 2,
      team: team1,
      intra: intraUser3,
    };

    const teamUser3: TeamUser = {
      id: 3,
      team: team2,
      intra: intraUser1,
    };

    const teamUser4: TeamUser = {
      id: 4,
      team: team3,
      intra: intraUser2,
    };

    const teamUser5: TeamUser = {
      id: 5,
      team: team3,
      intra: intraUser3,
    };

    const evaluation1: Evaluation = {
      id: 1,
      corrector: intraUser2,
      comment: 'good',
      feedback: 'good',
      finalMark: 100,
      positive: true,
      flag: 1,
      beginAt: new Date(),
      endAt: new Date(),
      rating: 5,
      team: team1,
    };

    const evaluation2: Evaluation = {
      id: 2,
      corrector: intraUser2,
      comment: 'good',
      feedback: 'good',
      finalMark: 100,
      positive: true,
      flag: 1,
      beginAt: new Date(),
      endAt: new Date(),
      rating: 5,
      team: team1,
    };

    const evaluation3: Evaluation = {
      id: 3,
      corrector: intraUser1,
      comment: 'good',
      feedback: 'good',
      finalMark: 100,
      positive: true,
      flag: 1,
      beginAt: new Date(),
      endAt: new Date(),
      rating: 5,
      team: team2,
    };

    const evaluation4: Evaluation = {
      id: 4,
      corrector: intraUser1,
      comment: 'good',
      feedback: 'good',
      finalMark: 100,
      positive: true,
      flag: 1,
      beginAt: new Date(),
      endAt: new Date(),
      rating: 5,
      team: team3,
    };

    const subjectStat1: SubjectStat = {
      id: 15,
      intra: intraUser1,
      averageFinalMark: 80.51,
      averageClearTime: 24.5 * 24 * 60 * 60 * 1000,
      passedCount: 10,
      totalRetryCount: 100,
      lastProject: project1,
    };

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.manager.save(Coalition, coalition1);
    await queryRunner.manager.save(Coalition, coalition2);
    await queryRunner.manager.save(IntraUser, intraUser1);
    await queryRunner.manager.save(IntraUser, intraUser2);
    await queryRunner.manager.save(IntraUser, intraUser3);
    await queryRunner.manager.save(IntraUser, intraUser4);
    // await queryRunner.manager.save(User, user1);
    await queryRunner.manager.save(Achievement, achievement1);
    await queryRunner.manager.save(AchievementUser, achievementUser1);
    await queryRunner.manager.save(Title, title1);
    await queryRunner.manager.save(Title, title2);
    await queryRunner.manager.save(TitleUser, titleUser1);
    await queryRunner.manager.save(TitleUser, titleUser2);
    await queryRunner.manager.save(
      MonthlyCoalitionScore,
      monthlyCoalitionScore1
    );
    await queryRunner.manager.save(
      MonthlyCoalitionScore,
      monthlyCoalitionScore2
    );
    await queryRunner.manager.save(
      MonthlyCoalitionScore,
      monthlyCoalitionScore3
    );
    await queryRunner.manager.save(
      MonthlyCoalitionScore,
      monthlyCoalitionScore4
    );
    await queryRunner.manager.save(
      MonthlyCoalitionScore,
      monthlyCoalitionScore5
    );
    await queryRunner.manager.save(CorrectedStat, correctedStat1);
    await queryRunner.manager.save(CorrectedStat, correctedStat2);
    await queryRunner.manager.save(CorrectorStat, correctorStat1);
    await queryRunner.manager.save(CorrectorStat, correctorStat2);
    await queryRunner.manager.save(
      MonthlyEvaluationCount,
      monthlyEvaluationCount1
    );
    await queryRunner.manager.save(
      MonthlyEvaluationCount,
      monthlyEvaluationCount2
    );
    await queryRunner.manager.save(CoalitionScore, coalitionScore1);
    await queryRunner.manager.save(CoalitionScore, coalitionScore2);
    await queryRunner.manager.save(CoalitionScore, coalitionScore3);
    await queryRunner.manager.save(CoalitionScore, coalitionScore4);
    await queryRunner.manager.save(CoalitionScore, coalitionScore5);
    await queryRunner.manager.save(Subject, subject1);
    await queryRunner.manager.save(Subject, subject2);
    await queryRunner.manager.save(Project, project1);
    await queryRunner.manager.save(Project, project2);
    await queryRunner.manager.save(Project, project3);
    await queryRunner.manager.save(Team, team1);
    await queryRunner.manager.save(Team, team2);
    await queryRunner.manager.save(Team, team3);
    await queryRunner.manager.save(TeamUser, teamUser1);
    await queryRunner.manager.save(TeamUser, teamUser2);
    await queryRunner.manager.save(TeamUser, teamUser3);
    await queryRunner.manager.save(TeamUser, teamUser4);
    await queryRunner.manager.save(TeamUser, teamUser5);
    await queryRunner.manager.save(Evaluation, evaluation1);
    await queryRunner.manager.save(Evaluation, evaluation2);
    await queryRunner.manager.save(Evaluation, evaluation3);
    await queryRunner.manager.save(Evaluation, evaluation4);
    await queryRunner.manager.save(SubjectStat, subjectStat1);

    console.log('seeded');
  }
}
