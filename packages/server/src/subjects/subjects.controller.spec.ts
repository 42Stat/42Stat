import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { Subject } from './entity/subject.entity';
import { SubjectsController } from './subjects.controller';
import { subjectsProviders } from './subjects.providers';
import { SubjectsService } from './subjects.service';

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

describe('SubjectsController', () => {
  let controller: SubjectsController;
  let service: SubjectsService;
  let subjectRepository: Repository<Subject>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [SubjectsController],
      providers: [SubjectsService, ...subjectsProviders],
    }).compile();

    controller = module.get<SubjectsController>(SubjectsController);
    service = module.get<SubjectsService>(SubjectsService);
    subjectRepository = module.get('SUBJECT_REPOSITORY');
  });

  describe('getSubjects', () => {
    // 정상 작동
    it('정상 작동', async () => {
      jest
        .spyOn(subjectRepository, 'find')
        .mockResolvedValueOnce([subject1, subject2]);
      expect(
        await controller.getSubjects('inner', undefined, undefined)
      ).toBeInstanceOf(Array);
    });
    // 정렬 옵션(+)
    it('정렬 옵션(+)', async () => {
      jest.spyOn(subjectRepository, 'find').mockResolvedValueOnce([]);
      expect(
        await controller.getSubjects('inner', 'id', undefined)
      ).toBeInstanceOf(Array);
    });
    // 정렬 옵션(-)
    it('정렬 옵션(-)', async () => {
      jest.spyOn(subjectRepository, 'find').mockResolvedValueOnce([]);
      expect(
        await controller.getSubjects('inner', '-id', undefined)
      ).toBeInstanceOf(Array);
    });
    // 스코프 옵션(inner)
    it('스코프 옵션(inner)', async () => {
      jest.spyOn(subjectRepository, 'find').mockResolvedValueOnce([]);
      expect(
        await controller.getSubjects('inner', undefined, undefined)
      ).toBeInstanceOf(Array);
    });
    // 스코프 옵션(outer)
    it('스코프 옵션(outer)', async () => {
      jest.spyOn(subjectRepository, 'find').mockResolvedValueOnce([]);
      expect(
        await controller.getSubjects('outer', undefined, undefined)
      ).toBeInstanceOf(Array);
    });
    // 스코프 옵션(null)
    it('스코프 옵션(null)', async () => {
      jest.spyOn(subjectRepository, 'find').mockResolvedValueOnce([]);
      expect(
        await controller.getSubjects(null, undefined, undefined)
      ).toBeInstanceOf(Array);
    });
    // 페이지 에러(0)
    it('페이지 에러(0)', async () => {
      jest.spyOn(subjectRepository, 'find').mockResolvedValueOnce([]);
      try {
        await controller.getSubjects('inner', undefined, '0');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
    // 페이지 에러(-1)
    it('페이지 에러(-1)', async () => {
      jest.spyOn(subjectRepository, 'find').mockResolvedValueOnce([]);
      try {
        await controller.getSubjects('inner', undefined, '-1');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
    // 페이지 에러(1.5)
    it('페이지 에러(1.5)', async () => {
      jest.spyOn(subjectRepository, 'find').mockResolvedValueOnce([]);
      try {
        await controller.getSubjects('inner', undefined, '1.5');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
