import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { userTransformer } from 'src/users/transformers/user.transformer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/register')
  async register(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, refreshToken, accessToken } = await this.authService.register(
      userDto,
    );
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return { user: userTransformer(user), token: accessToken };
  }

  @Post('/login')
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken, user } = await this.authService.login(
      authDto,
    );
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return { user: userTransformer(user), token: accessToken };
  }
}
