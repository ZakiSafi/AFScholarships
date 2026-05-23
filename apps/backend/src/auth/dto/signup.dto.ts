import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class SignupDto {
  @ApiProperty({ example: 'student@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string

  @ApiPropertyOptional({ example: 'Ahmad Khan' })
  @IsOptional()
  @IsString()
  name?: string
}
