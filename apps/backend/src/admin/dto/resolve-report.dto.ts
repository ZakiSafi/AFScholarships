import { ApiProperty } from '@nestjs/swagger';
import { ReportStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class ResolveReportDto {
  @ApiProperty({ enum: ReportStatus, enumName: 'ReportStatus' })
  @IsEnum(ReportStatus)
  status!: ReportStatus;
}
