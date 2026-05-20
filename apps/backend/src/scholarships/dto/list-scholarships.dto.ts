import { ApiPropertyOptional } from '@nestjs/swagger';
import { DegreeLevel, FundingType, VerificationStatus } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListScholarshipsDto {
  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ enum: DegreeLevel })
  @IsEnum(DegreeLevel)
  @IsOptional()
  degreeLevel?: DegreeLevel;

  @ApiPropertyOptional({ enum: FundingType })
  @IsEnum(FundingType)
  @IsOptional()
  fundingType?: FundingType;

  @ApiPropertyOptional({
    description: 'Filter by applicant citizenship country',
  })
  @IsString()
  @IsOptional()
  eligibleCountry?: string;

  @ApiPropertyOptional({ default: false })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  partnerOnly?: boolean;

  @ApiPropertyOptional({ enum: VerificationStatus })
  @IsEnum(VerificationStatus)
  @IsOptional()
  verificationStatus?: VerificationStatus;
}
