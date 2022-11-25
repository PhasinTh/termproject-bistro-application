import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, example: 'user@localhost' })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'john doe' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'secret' })
  password!: string;
}
