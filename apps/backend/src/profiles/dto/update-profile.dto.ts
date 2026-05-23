import { ApiPropertyOptional } from '@nestjs/swagger';
import { DegreeLevel } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  province?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  educationLevel?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fieldOfStudy?: string;

  @ApiPropertyOptional({ enum: DegreeLevel })
  @IsEnum(DegreeLevel)
  @IsOptional()
  targetDegree?: DegreeLevel;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  targetCountry?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;
}
