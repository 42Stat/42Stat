import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}

  async getUserProfile(id: number) {}

  async getUserSummary(id: number) {
    this.getOverall(id);
    this.getCorrectorStat(id);
    this.getCorrectedStat(id);
    this.getSubjectStat(id);
  }

  getOverall(id: number) {}
  getCorrectorStat(id: number) {}
  getCorrectedStat(id: number) {}
  getSubjectStat(id: number) {}

  async getUserSubjects(id: number) {}
}
