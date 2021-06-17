import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { FacebookAuthGuard } from './auth/facebook-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('auth/google')
  googleAuth(@Request() req) {
    return req;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('auth/google/redirect')
  googleAuthRedirect(@Request() req) {
    return this.authService.loginOauth(req);
  }

  @UseGuards(FacebookAuthGuard)
  @Get('auth/facebook')
  facebookAuth(@Request() req) {
    return req;
  }

  @UseGuards(FacebookAuthGuard)
  @Get('auth/facebook/redirect')
  facebookAuthRedirect(@Request() req) {
    return this.authService.loginOauth(req);
  }
}
