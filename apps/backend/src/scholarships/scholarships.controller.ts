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
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
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

  @Get()
  @ApiOperation({ summary: 'List scholarships with filters and pagination' })
  list(@Query() query: ListScholarshipsDto) {
    return this.scholarshipsService.list(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get scholarship details by slug' })
  getBySlug(@Param('slug') slug: string) {
    return this.scholarshipsService.getBySlug(slug);
  }

  @Post(':id/report')
  @ApiOperation({
    summary: 'Report potentially outdated or incorrect listing data',
  })
  @ApiResponse({ status: 201, description: 'Report submitted' })
  @UseGuards(JwtAuthGuard)
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
  @ApiOperation({ summary: 'Create scholarship (admin)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  create(@Body() payload: CreateScholarshipDto, @CurrentUser() user: AuthUser) {
    return this.scholarshipsService.create(payload, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update scholarship (admin)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() payload: UpdateScholarshipDto) {
    return this.scholarshipsService.update(id, payload);
  }

  @Patch(':id/verify')
  @ApiOperation({ summary: 'Verify or flag scholarship (admin)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  verify(@Param('id') id: string, @Body() payload: VerifyScholarshipDto) {
    return this.scholarshipsService.verify(id, payload.status);
  }
}
