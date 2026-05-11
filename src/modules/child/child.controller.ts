import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChildService } from './child.service';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { createChildBodySchema } from './schemas/create-child.schema';
import type { CreateChildBody } from './schemas/create-child.schema';
import { ZodValidate } from 'common/decorators/zod-validate.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import type { User } from 'common/decorators/current-user.decorator';
import { Roles } from 'common/decorators/roles.decorator';

@Controller('child')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post('signup')
  @UseGuards(JwtAuthGuard)
  @Roles('INSTITUTION')
  @ZodValidate({ body: createChildBodySchema })
  async create(
    @CurrentUser() user: User,
    @Body() createChildDto: CreateChildBody,
  ) {
    return this.childService.create(createChildDto, user.id);
  }
}
