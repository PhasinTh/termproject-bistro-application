import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateQRCodeDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  bistroId?: string;
}
