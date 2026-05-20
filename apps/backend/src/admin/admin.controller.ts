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
import { ReportStatus, UserRole } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { ResolveReportDto } from './dto/resolve-report.dto';
import { AdminService } from './admin.service';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Patch('scholarships/flag-stale')
  @ApiOperation({
    summary: 'Flag outdated scholarships as stale based on review recency',
  })
  flagStale(@Query('days') days?: string) {
    const staleDays = days ? Number(days) : 30;
    return this.adminService.flagStaleScholarships(staleDays);
  }
}
