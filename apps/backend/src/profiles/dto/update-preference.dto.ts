import { ApiPropertyOptional } from '@nestjs/swagger';
import { DegreeLevel } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePreferenceDto {
  @ApiPropertyOptional({ example: 'en' })
  @IsString()
  @IsOptional()
  locale?: string;

  @ApiPropertyOptional({ example: 'Asia/Kabul' })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  emailDigestEnabled?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  marketingOptIn?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferredCountries?: string[];

  @ApiPropertyOptional({ enum: DegreeLevel, isArray: true })
  @IsArray()
  @IsEnum(DegreeLevel, { each: true })
  @IsOptional()
  preferredDegreeLevels?: DegreeLevel[];
}
