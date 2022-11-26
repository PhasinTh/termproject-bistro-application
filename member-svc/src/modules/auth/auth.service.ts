import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { SendWelcomeEmailDTO } from './dto/welcome_emaill.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject('MAIL_SERVICE') private client: ClientProxy,
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

      // Send welcome email

      const message: SendWelcomeEmailDTO = {
        email: userAttempt.email,
        name: userAttempt.name,
        subject: 'ยินดีต้อนรับสมาชิกใหม่',
        header: 'ยินดีต้อนรับคุณ ' + userAttempt.name,
        message:
          'จัดการทุกเมนูของคุณได้ง่าย ๆ ที่นี่ <br /> <a href"http://everything101.xyz">http://everything101.xyz</a><br /><br /><h6>Sincerely: Bistro4.0 Team Member</h6>',
      };
      const record = new RmqRecordBuilder<SendWelcomeEmailDTO>(message)
        .setOptions({
          persistent: true,
        })
        .build();
      this.client.emit<SendWelcomeEmailDTO>('send_welcome_emaill', record);
      return userAttempt;
    } catch (error) {
      return error;
    }
  }

  async createJwt(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
