import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';

export class ApplicationStepDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  orderIndex!: number;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean = true;
}

export class ScholarshipRequirementDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  orderIndex!: number;

  @ApiProperty()
  @IsString()
  label!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isMandatory?: boolean = true;
}

export class ScholarshipBenefitDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  orderIndex!: number;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  description!: string;
}

export class ScholarshipFaqDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  orderIndex!: number;

  @ApiProperty()
  @IsString()
  question!: string;

  @ApiProperty()
  @IsString()
  answer!: string;
}

export class ScholarshipSourceDto {
  @ApiProperty()
  @IsUrl()
  url!: string;

  @ApiProperty()
  @IsString()
  label!: string;
}

export class ScholarshipTagDto {
  @ApiProperty({ description: 'Tag slug, created if missing' })
  @IsString()
  slug!: string;

  @ApiProperty()
  @IsString()
  name!: string;
}

export class NestedScholarshipContentDto {
  @ApiPropertyOptional({ type: [ApplicationStepDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApplicationStepDto)
  @IsOptional()
  steps?: ApplicationStepDto[];

  @ApiPropertyOptional({ type: [ScholarshipRequirementDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScholarshipRequirementDto)
  @IsOptional()
  requirements?: ScholarshipRequirementDto[];

  @ApiPropertyOptional({ type: [ScholarshipBenefitDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScholarshipBenefitDto)
  @IsOptional()
  benefits?: ScholarshipBenefitDto[];

  @ApiPropertyOptional({ type: [ScholarshipFaqDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScholarshipFaqDto)
  @IsOptional()
  faqs?: ScholarshipFaqDto[];

  @ApiPropertyOptional({ type: [ScholarshipSourceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScholarshipSourceDto)
  @IsOptional()
  sources?: ScholarshipSourceDto[];

  @ApiPropertyOptional({ type: [ScholarshipTagDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScholarshipTagDto)
  @IsOptional()
  tags?: ScholarshipTagDto[];
}
