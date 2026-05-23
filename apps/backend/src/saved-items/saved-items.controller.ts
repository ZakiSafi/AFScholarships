import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import type { AuthUser } from '../auth/interfaces/auth-user.interface';
import { SavedItemsService } from './saved-items.service';

@ApiTags('saved-items')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('saved-items')
export class SavedItemsController {
  constructor(private readonly savedItemsService: SavedItemsService) {}

  @Get()
  @ApiOperation({ summary: 'List current user saved scholarships' })
  list(@CurrentUser() user: AuthUser) {
    return this.savedItemsService.listForUser(user.userId);
  }

  @Post(':scholarshipId')
  @ApiOperation({ summary: 'Save scholarship for current user' })
  @ApiResponse({ status: 201, description: 'Saved' })
  save(
    @CurrentUser() user: AuthUser,
    @Param('scholarshipId') scholarshipId: string,
  ) {
    return this.savedItemsService.save(user.userId, scholarshipId);
  }

  @Delete(':scholarshipId')
  @ApiOperation({ summary: 'Remove saved scholarship for current user' })
  remove(
    @CurrentUser() user: AuthUser,
    @Param('scholarshipId') scholarshipId: string,
  ) {
    return this.savedItemsService.remove(user.userId, scholarshipId);
  }
}
