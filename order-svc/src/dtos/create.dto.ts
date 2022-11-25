import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidationError,
    ValidatorOptions,
} from 'class-validator'
export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    bistroId: string

    @IsString()
    @IsNotEmpty()
    qrcodeId: string
}
