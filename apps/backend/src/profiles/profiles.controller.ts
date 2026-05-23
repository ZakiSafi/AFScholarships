import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('profiles')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile and preferences' })
  getMine(@CurrentUser() user: AuthUser) {
    return this.profilesService.getMine(user.userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateProfile(
    @CurrentUser() user: AuthUser,
    @Body() payload: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfile(user.userId, payload);
  }

  @Patch('me/preferences')
  @ApiOperation({ summary: 'Update current user preferences' })
  updatePreference(
    @CurrentUser() user: AuthUser,
    @Body() payload: UpdatePreferenceDto,
  ) {
    return this.profilesService.updatePreference(user.userId, payload);
  }
}
