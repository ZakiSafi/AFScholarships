import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { RemindersService } from './reminders.service';

@ApiTags('reminders')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Get('me')
  @ApiOperation({ summary: 'List reminders for current user' })
  listMine(@CurrentUser() user: AuthUser) {
    return this.remindersService.listMine(user.userId);
  }

  @Post('scholarship/:scholarshipId')
  @ApiOperation({ summary: 'Create reminder for a scholarship' })
  create(
    @CurrentUser() user: AuthUser,
    @Param('scholarshipId') scholarshipId: string,
    @Body() payload: CreateReminderDto,
  ) {
    return this.remindersService.create(
      user.userId,
      scholarshipId,
      payload,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update reminder date for current user' })
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() payload: UpdateReminderDto,
  ) {
    return this.remindersService.update(id, user.userId, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete reminder for current user' })
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.remindersService.remove(id, user.userId);
  }

  @Post(':id/mark-sent')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Mark reminder as sent (admin/system)' })
  markSent(@Param('id') id: string) {
    return this.remindersService.markSent(id);
  }
}
