import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class ApplicationAnswerDto {
  @ApiProperty()
  @IsString()
  questionKey!: string;

  @ApiProperty()
  @IsString()
  answer!: string;
}

export class CreatePartnerApplicationDto {
  @ApiProperty()
  @IsString()
  fullName!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  educationLevel?: string;

  @ApiProperty({ maxLength: 3000 })
  @IsString()
  @MaxLength(3000)
  statement!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  docsUrls?: string[] = [];

  @ApiPropertyOptional({ type: [ApplicationAnswerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApplicationAnswerDto)
  @IsOptional()
  answers?: ApplicationAnswerDto[];
}
