import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ListUsersDto } from './dto/list-users.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users (admin)' })
  list(@Query() query: ListUsersDto) {
    return this.usersService.list(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id (admin)' })
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }
}
