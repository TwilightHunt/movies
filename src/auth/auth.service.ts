import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { User, UserDocument } from 'src/users/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async register(userDto: UserDto) {
    const isExist = await this.usersModel.findOne({ login: userDto.login });
    if (isExist) {
      throw new BadRequestException('User with this login alreasy exists');
    }
    const user = await this.usersService.create({
      ...userDto,
      password: bcrypt.hashSync(userDto.password, 10),
    });

    const tokens = await this.getTokens(user);
    return { user, ...tokens };
  }

  async login(authDto: AuthDto) {
    const user = await this.usersModel.findOne({ login: authDto.login });
    if (!user) {
      throw new BadRequestException('User does not exists');
    }

    if (!bcrypt.compareSync(authDto.password, user.password)) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this.getTokens(user);
    return { ...tokens, user };
  }

  async getTokens(payload: UserDocument) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { user: payload },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { user: payload },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
