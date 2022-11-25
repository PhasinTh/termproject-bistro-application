import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidationError,
  ValidatorOptions,
} from 'class-validator';
export class UpdateQRCodeDto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  bistroId?: string;
}
