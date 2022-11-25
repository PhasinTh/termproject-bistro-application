import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class MenuRequestId {
    @IsNotEmpty()
    @IsString()
    id: string
}

export class MenusRequestRequest {
    @IsOptional()
    @IsNumber()
    page?: number

    @IsOptional()
    @IsNumber()
    limit?: number
}

export class MenuByBistroRequest {
    @IsNotEmpty()
    @IsString()
    bistroId: string

    meta?: MenusRequestRequest
}
