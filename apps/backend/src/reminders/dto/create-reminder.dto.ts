import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class CreateReminderDto {
  @ApiProperty()
  @IsDateString()
  reminderAt!: string;
}
