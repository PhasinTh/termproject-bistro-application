import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({ example: 'aceess-token' })
  accessToken: string;
  user: User;
}
