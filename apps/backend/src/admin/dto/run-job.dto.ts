import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class RunJobDto {
  @ApiProperty({
    enum: [
      'stale-scholarships',
      'reminder-sender',
      'digest-sender',
      'notification-retry',
    ],
  })
  @IsIn([
    'stale-scholarships',
    'reminder-sender',
    'digest-sender',
    'notification-retry',
  ])
  job!: string;
}
