import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../entity/project.entity';
import { Subject } from '../entity/subject.entity';

export class GetSubjectDto {
  constructor(subject: Subject, isPassed: boolean) {
    this.id = subject.id;
    this.name = subject.name;
    this.finalMark = subject.averageFinalMark;
    this.retryCount = subject.averageRetryCount;
    this.clearTime = subject.averageClearTime;
    this.isPassed = isPassed;
    this.link = `https://projects.intra.42.fr/projects/${subject.slug}`;
  }
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  finalMark: number;
  @ApiProperty()
  retryCount: number;
  @ApiProperty()
  clearTime: number;
  @ApiProperty()
  isPassed: boolean;
  @ApiProperty()
  link: string;
}

export class GetUserSubjectDto {
  constructor(project: Project) {
    this.id = project.subject.id;
    this.name = project.subject.name;
    this.finalMark = project.finalMark;
    this.retryCount = project.occurrence;
    this.clearTime = project.clearTime;
    this.isPassed = project.validated;
    this.link = `https://projects.intra.42.fr/${project.subject.slug}/${project.intra.login}`;
  }
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  finalMark: number;
  @ApiProperty()
  retryCount: number;
  @ApiProperty()
  clearTime: number;
  @ApiProperty()
  isPassed: boolean;
  @ApiProperty()
  link: string;
}
