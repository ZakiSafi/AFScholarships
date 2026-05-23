import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateScholarshipDto extends NestedScholarshipContentDto {
  @ApiProperty()
  @IsString()
  slug!: string;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  summary!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  provider!: string;

  @ApiProperty()
  @IsString()
  hostCountry!: string;

  @ApiProperty({ enum: DegreeLevel })
  @IsEnum(DegreeLevel)
  degreeLevel!: DegreeLevel;

  @ApiProperty({ enum: FundingType })
  @IsEnum(FundingType)
  fundingType!: FundingType;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  languageRequirement?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fieldOfStudy?: string[] = [];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  eligibleCountries?: string[] = [];

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

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isPartnerApplication?: boolean = false;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  startsAt?: string;

  @ApiProperty()
  @IsDateString()
  deadlineAt!: string;

  @ApiPropertyOptional({ default: 'UTC' })
  @IsString()
  @IsOptional()
  deadlineTimezone?: string = 'UTC';

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean = false;
}
