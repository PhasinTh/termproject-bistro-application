import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
export class UpdateMenuDto {
    @IsNotEmpty()
    @IsString()
    id!: string

    @IsOptional()
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

    @IsOptional() _
    @IsNumber()
    price: number
}
