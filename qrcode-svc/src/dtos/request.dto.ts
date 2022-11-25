import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class QRCodeRequestId {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class QRCodesRequestRequest {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

export class QRCodeByBistroRequest {
  @IsNotEmpty()
  @IsString()
  bistroId: string;

  meta?: QRCodesRequestRequest;
}
