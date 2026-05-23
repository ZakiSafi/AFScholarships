import { ApiPropertyOptional } from '@nestjs/swagger';
import { DegreeLevel, FundingType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { NestedScholarshipContentDto } from './scholarship-content.dto';

export class UpdateScholarshipDto extends NestedScholarshipContentDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  hostCountry?: string;

  @ApiPropertyOptional({ enum: DegreeLevel })
  @IsEnum(DegreeLevel)
  @IsOptional()
  degreeLevel?: DegreeLevel;

  @ApiPropertyOptional({ enum: FundingType })
  @IsEnum(FundingType)
  @IsOptional()
  fundingType?: FundingType;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  languageRequirement?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fieldOfStudy?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  eligibleCountries?: string[];

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(12)
  @Max(120)
  @IsOptional()
  minAge?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(12)
  @Max(120)
  @IsOptional()
  maxAge?: number;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  applicationUrl?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPartnerApplication?: boolean;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  startsAt?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  deadlineAt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  deadlineTimezone?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
