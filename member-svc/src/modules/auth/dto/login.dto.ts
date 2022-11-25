import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'john doe' })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'secret' })
  password!: string;
}
