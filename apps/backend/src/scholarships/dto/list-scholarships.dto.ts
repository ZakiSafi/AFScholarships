import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  DegreeLevel,
  FundingType,
  ScholarshipStatus,
  VerificationStatus,
} from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum ScholarshipSortField {
  DEADLINE = 'deadline',
  TITLE = 'title',
  CREATED = 'created',
  FEATURED = 'featured',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  eligibleCountry?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fieldOfStudy?: string;

  @ApiPropertyOptional({ description: 'Filter by tag slug' })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiPropertyOptional({ default: false })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  partnerOnly?: boolean;

  @ApiPropertyOptional({ enum: VerificationStatus })
  @IsEnum(VerificationStatus)
  @IsOptional()
  verificationStatus?: VerificationStatus;

  @ApiPropertyOptional({ enum: ScholarshipSortField, default: 'deadline' })
  @IsEnum(ScholarshipSortField)
  @IsOptional()
  sortBy?: ScholarshipSortField = ScholarshipSortField.DEADLINE;

  @ApiPropertyOptional({ enum: SortOrder, default: 'asc' })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder = SortOrder.ASC;

  @ApiPropertyOptional({
    description: 'Include facet counts in response',
    default: false,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  includeFacets?: boolean;
}

export class AdminListScholarshipsDto extends ListScholarshipsDto {
  @ApiPropertyOptional({ enum: ScholarshipStatus })
  @IsEnum(ScholarshipStatus)
  @IsOptional()
  status?: ScholarshipStatus;
}
