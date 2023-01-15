import { Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { GetSubjectDto } from './dto/getSubject.dto';
import { Subject } from './entity/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject('SUBJECT_REPOSITORY')
    private subjectRepository: Repository<Subject>
  ) {}

  async getSubjects(
    id: number,
    scope = true,
    sort = 'totalClearCount',
    page = 1
  ): Promise<GetSubjectDto[]> {
    const pageSize = 10;
    const subjectFindOptions: FindManyOptions<Subject> = {
      where: {
        isCommonCourse: scope,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    };
    // TODO: 정렬 기준에 있는 것들만 허용
    if (sort.charAt(0) === '-')
      subjectFindOptions.order = { [sort.substring(1)]: 'DESC' };
    else subjectFindOptions.order = { [sort]: 'ASC' };

    const subjects = await this.subjectRepository.find(subjectFindOptions);

    // cleared Count를 추가할 경우
    // const subjectPassedCounts = await this.subjectRepository.query(
    //   `SELECT subject_id, COUNT(*) AS count FROM projects WHERE user_id = ${id} AND validated = true GROUP BY subject_id`
    // );
    // const subjectPassedCountMap = new Map();
    // subjectPassedCounts.forEach((subjectPassedCount) => {
    //   subjectPassedCountMap.set(
    //     subjectPassedCount.subject_id,
    //     subjectPassedCount.count
    //   );
    // });

    const passedSubjects = await this.subjectRepository.find({
      where: { projects: { intra: { id: id }, validated: true } },
      select: ['id'],
      relations: ['projects', 'projects.intra'],
    });
    const passedSubjectSet = new Set(
      passedSubjects.map((subject) => subject.id)
    );

    const subjectDtos = subjects.map((subject) => {
      return new GetSubjectDto(subject, passedSubjectSet.has(subject.id));
    });
    console.log(subjectDtos);

    return subjectDtos;
  }
}
