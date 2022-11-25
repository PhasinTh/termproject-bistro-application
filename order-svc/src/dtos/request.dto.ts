import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'

export class OrderRequestId {
    @IsNotEmpty()
    @IsString()
    id: string
}

export class OrderByRefId {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    refId: string
}

export class RequestBistro {
    @IsNotEmpty()
    @IsString()
    bistroId: string
    meta?: MetaRequest
}

export class GetOrdersRequest {
    meta?: MetaRequest
}

export class RequestQR {
    @IsNotEmpty()
    @IsString()
    qrcodeId: string

    meta?: MetaRequest
}

export class MetaRequest {
    @IsOptional()
    @IsNumber()
    page?: number

    @IsOptional()
    @IsNumber()
    limit?: number
}
