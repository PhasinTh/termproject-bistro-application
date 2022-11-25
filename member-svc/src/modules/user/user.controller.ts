import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Crud } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase'],
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    exclude: ['password'],
    limit: 10,
    alwaysPaginate: true,
  },
})
// @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
}
