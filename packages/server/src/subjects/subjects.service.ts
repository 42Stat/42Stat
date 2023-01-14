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
    scope: string,
    sort: string,
    page: number
  ): Promise<GetSubjectDto[]> {
    const subjectFindOptions: FindManyOptions<Subject> = {};
    return;
  }
}
