import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}
  async create(reportDto: CreateReportDto) {
    const report = this.reportRepository.create(reportDto);
    return this.reportRepository.save(report);
  }
}
