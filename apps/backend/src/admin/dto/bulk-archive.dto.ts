import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class BulkArchiveExpiredDto {
  @ApiPropertyOptional({
    description: 'If true, only preview counts without archiving',
    default: false,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  dryRun?: boolean = false;
}
