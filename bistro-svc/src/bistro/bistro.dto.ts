import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CreateBistroRequest, BistroRequestId } from './proto/bistro.pb'

export class CreateBistroRequestDto implements CreateBistroRequest {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsOptional()
    @IsString()
    image: string
    @IsOptional()
    @IsString()
    description: string
    @IsNotEmpty()
    @IsString()
    ownerId: string
}

export class BistroByIdRequestDto implements BistroRequestId {
    @IsNotEmpty()
    @IsString()
    id: string
}
