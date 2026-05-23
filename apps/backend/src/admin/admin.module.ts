import { Module } from '@nestjs/common';
import { JobsModule } from '../jobs/jobs.module';
import { ReportsModule } from '../reports/reports.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [JobsModule, ReportsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
