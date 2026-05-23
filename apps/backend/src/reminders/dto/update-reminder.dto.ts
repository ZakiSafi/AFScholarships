import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class UpdateReminderDto {
  @ApiProperty()
  @IsDateString()
  reminderAt!: string;
}
