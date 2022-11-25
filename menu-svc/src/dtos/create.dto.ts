import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    name!: string

    @IsString()
    @IsOptional()
    bistroId?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    image?: string

    @IsNumber()
    @IsNotEmpty()
    price: number
}
