import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/common/constant/role.constant';
import { BaseEntity } from 'src/common/entitities/base.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

import { CrudValidationGroups } from '@nestjsx/crud';
import { ApiProperty } from '@nestjs/swagger';
const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('User')
export class User extends BaseEntity {
  @ApiProperty({ example: 'name' })
  @Column({ length: 50, nullable: false })
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  name: string;

  @ApiProperty({ example: 'email@email.local' })
  @Column({ length: 50, unique: true, nullable: false, update: true })
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @Column({ length: 255, unique: true, nullable: false })
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  @Exclude()
  password: string;

  @ApiProperty({ example: 'ADMIN' })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Exclude()
  role: Role;

  @BeforeInsert()
  async passwordEncrypt() {
    this.password = await hash(this.password, 10);
  }
}
