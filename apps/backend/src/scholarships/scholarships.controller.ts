import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { AdminListScholarshipsDto } from './dto/list-scholarships.dto';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { ListScholarshipsDto } from './dto/list-scholarships.dto';
import { ReportListingDto } from './dto/report-listing.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { VerifyScholarshipDto } from './dto/verify-scholarship.dto';
import { ScholarshipsService } from './scholarships.service';

@ApiTags('scholarships')
@Controller('scholarships')
export class ScholarshipsController {
  constructor(private readonly scholarshipsService: ScholarshipsService) {}

  @Get('facets')
  @ApiOperation({ summary: 'Get facet counts for published scholarships' })
  facets() {
    return this.scholarshipsService.getFacets();
  }

  @Get('admin/list')
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all scholarships including drafts (admin)' })
  adminList(@Query() query: AdminListScholarshipsDto) {
    return this.scholarshipsService.adminList(query);
  }

  @Get()
  @ApiOperation({
    summary: 'List published scholarships with filters, sorting, and facets',
  })
  list(@Query() query: ListScholarshipsDto) {
    return this.scholarshipsService.list(query);
  }

  @Get(':slug/related')
  @ApiOperation({ summary: 'Get related published scholarships by slug' })
  related(@Param('slug') slug: string, @Query('limit') limit?: string) {
    const parsed = limit ? Number(limit) : 4;
    return this.scholarshipsService.getRelated(slug, parsed);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get published scholarship details by slug' })
  getBySlug(@Param('slug') slug: string) {
    return this.scholarshipsService.getBySlug(slug);
  }

  @Post(':id/report')
  @ApiOperation({
    summary: 'Report potentially outdated or incorrect listing data',
  })
  @ApiResponse({ status: 201, description: 'Report submitted' })
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  report(
    @Param('id') scholarshipId: string,
    @Body() payload: ReportListingDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.scholarshipsService.createReport(
      scholarshipId,
      payload,
      user.userId,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create scholarship draft (admin)' })
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  create(@Body() payload: CreateScholarshipDto, @CurrentUser() user: AuthUser) {
    return this.scholarshipsService.create(payload, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update scholarship (admin)' })
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() payload: UpdateScholarshipDto) {
    return this.scholarshipsService.update(id, payload);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish scholarship (admin)' })
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  publish(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.scholarshipsService.publish(id, user.userId);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive scholarship (admin)' })
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  archive(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.scholarshipsService.archive(id, user.userId);
  }

  @Patch(':id/verify')
  @ApiOperation({ summary: 'Verify or flag scholarship (admin)' })
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  verify(
    @Param('id') id: string,
    @Body() payload: VerifyScholarshipDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.scholarshipsService.verify(id, payload.status, user.userId);
  }
}
