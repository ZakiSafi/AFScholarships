import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { RemindersService } from './reminders.service';

@ApiTags('reminders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Get('me')
  @ApiOperation({ summary: 'List current user reminders' })
  listMine(@CurrentUser() user: AuthUser) {
    return this.remindersService.listMine(user.userId);
  }

  @Post('scholarship/:scholarshipId')
  @ApiOperation({ summary: 'Create reminder for scholarship' })
  create(
    @Param('scholarshipId') scholarshipId: string,
    @CurrentUser() user: AuthUser,
    @Body() payload: CreateReminderDto,
  ) {
    return this.remindersService.create(user.userId, scholarshipId, payload);
  }

  @Post(':id/mark-sent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Mark reminder as sent (admin/system)' })
  markSent(@Param('id') id: string) {
    return this.remindersService.markSent(id);
  }
}
