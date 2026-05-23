import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { ApplicationsService } from './applications.service';
import { CreatePartnerApplicationDto } from './dto/create-partner-application.dto';

@ApiTags('applications')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('partner/:scholarshipId')
  @ApiOperation({
    summary: 'Submit in-platform partner scholarship application',
  })
  createPartnerApplication(
    @Param('scholarshipId') scholarshipId: string,
    @CurrentUser() user: AuthUser,
    @Body() payload: CreatePartnerApplicationDto,
  ) {
    return this.applicationsService.applyToPartnerScholarship(
      scholarshipId,
      user.userId,
      payload,
    );
  }

  @Get('me')
  @ApiOperation({
    summary: 'List current user partner applications with status timeline',
  })
  listMine(@CurrentUser() user: AuthUser) {
    return this.applicationsService.listMine(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application detail with status timeline' })
  getById(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.applicationsService.getById(
      id,
      user.userId,
      user.role === UserRole.ADMIN,
    );
  }
}
