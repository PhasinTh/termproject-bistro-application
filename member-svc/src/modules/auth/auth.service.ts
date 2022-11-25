import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const userAttempt = await this.userService.findOne({
      where: { email },
    });
    if (userAttempt && compareSync(password, userAttempt.password)) {
      delete userAttempt['password'];
      return userAttempt;
    }
    return undefined;
  }

  async validateJwtPayload(payload: JwtPayload): Promise<User | undefined> {
    const user = await this.userService.findOne({ where: { id: payload.sub } });
    if (user) {
      delete user['password'];
      return user;
    }
    return undefined;
  }

  async login(user: Partial<User>): Promise<LoginResponseDto> {
    const payload = {
      sub: user.id,
      name: user.name,
      iss: process.env.JWT_ISS || '',
    } as JwtPayload;
    const token = await this.createJwt(payload);
    const foundUser = await this.userService.findOne({
      where: { id: user.id },
    });
    delete foundUser['password'];
    return {
      user: foundUser,
      accessToken: token,
    };
  }

  async register(user: Partial<User>): Promise<Partial<User>> {
    try {
      const userAttempt = this.userService.repo.create();
      Object.assign(userAttempt, user);
      await this.userService.repo.insert(userAttempt);
      delete userAttempt['password'];
      return userAttempt;
    } catch (error) {
      return error;
    }
  }

  async createJwt(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
