import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplicationStatus, ReportStatus, UserRole } from '@prisma/client';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { UpdateApplicationStatusDto } from '../applications/dto/update-application-status.dto';
import { ListAuditLogsDto } from './dto/list-audit-logs.dto';
import { ResolveReportDto } from './dto/resolve-report.dto';
import { AdminService } from './admin.service';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('reports')
  @ApiOperation({ summary: 'List listing reports for moderation' })
  listReports(@Query('status') status?: ReportStatus) {
    return this.adminService.listReports(status);
  }

  @Patch('reports/:id/resolve')
  @ApiOperation({ summary: 'Resolve or dismiss a listing report' })
  resolveReport(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() payload: ResolveReportDto,
  ) {
    return this.adminService.resolveReport(id, payload.status, user.userId);
  }

  @Get('applications')
  @ApiOperation({ summary: 'List partner applications for review' })
  listApplications(@Query('status') status?: ApplicationStatus) {
    return this.adminService.listApplications(status);
  }

  @Patch('applications/:id/status')
  @ApiOperation({ summary: 'Update partner application status' })
  updateApplicationStatus(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() payload: UpdateApplicationStatusDto,
  ) {
    return this.adminService.updateApplicationStatus(
      id,
      payload,
      user.userId,
    );
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Read moderation audit logs' })
  auditLogs(@Query() query: ListAuditLogsDto) {
    return this.adminService.listAuditLogs(query);
  }

  @Patch('scholarships/flag-stale')
  @ApiOperation({
    summary: 'Flag outdated scholarships as stale based on review recency',
  })
  flagStale(@Query('days') days?: string) {
    const staleDays = days ? Number(days) : 30;
    return this.adminService.flagStaleScholarships(staleDays);
  }
}
