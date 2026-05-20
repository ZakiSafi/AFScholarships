import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class ReportListingDto {
  @ApiProperty({ example: 'Deadline mismatch' })
  @IsString()
  @MaxLength(200)
  reason!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  details?: string;
}
