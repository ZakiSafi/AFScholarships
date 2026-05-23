import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import type { Response } from 'express'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { AuthService } from './auth.service'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { SignupDto } from './dto/signup.dto'
import { GoogleAuthGuard } from './guards/google-auth.guard'
import { JwtAccessGuard } from './guards/jwt-access.guard'
import type { AuthUser } from './interfaces/auth-user.interface'
import { GoogleProfile } from './strategies/google.strategy'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register with email and password' })
  signup(@Body() payload: SignupDto) {
    return this.authService.signup(
      payload.email,
      payload.password,
      payload.name,
    )
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload.email, payload.password)
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Rotate refresh token and issue new access token' })
  refresh(@Body() payload: RefreshTokenDto) {
    return this.authService.refresh(payload.refreshToken)
  }

  @Post('logout')
  @ApiOperation({ summary: 'Revoke refresh token' })
  logout(@Body() payload: RefreshTokenDto) {
    return this.authService.logout(payload.refreshToken)
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset email' })
  forgotPassword(@Body() payload: ForgotPasswordDto) {
    return this.authService.forgotPassword(payload.email)
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token from email' })
  resetPassword(@Body() payload: ResetPasswordDto) {
    return this.authService.resetPassword(payload.token, payload.password)
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Start Google OAuth flow' })
  googleAuth() {
    return
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  async googleCallback(
    @Req() req: { user: GoogleProfile },
    @Res() res: Response,
  ) {
    if (!this.authService.isGoogleOAuthEnabled()) {
      throw new ServiceUnavailableException('Google OAuth is not configured')
    }
    const tokens = await this.authService.handleGoogleLogin(req.user)
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173'
    const redirectUrl = new URL('/auth/callback', frontendUrl)
    redirectUrl.searchParams.set('accessToken', tokens.accessToken)
    redirectUrl.searchParams.set('refreshToken', tokens.refreshToken)
    return res.redirect(redirectUrl.toString())
  }

  @Get('profile')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @ApiResponse({ status: 200, description: 'User profile returned' })
  profile(@CurrentUser() user: AuthUser) {
    return this.authService.getProfile(user)
  }
}
