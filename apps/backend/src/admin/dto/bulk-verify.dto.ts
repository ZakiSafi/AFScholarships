import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VerificationStatus } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class BulkVerifyScholarshipsDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsUUID('4', { each: true })
  scholarshipIds!: string[];

  @ApiPropertyOptional({ enum: VerificationStatus, default: VerificationStatus.VERIFIED })
  @IsEnum(VerificationStatus)
  @IsOptional()
  status?: VerificationStatus = VerificationStatus.VERIFIED;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
