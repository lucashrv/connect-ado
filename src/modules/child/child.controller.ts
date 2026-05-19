import { Controller, Post, Body, UseGuards, Param, Put } from '@nestjs/common';
import { ChildService } from './child.service';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { createChildBodySchema } from './schemas/create-child.schema';
import type { CreateChildBody } from './schemas/create-child.schema';
import { ZodValidate } from 'common/decorators/zod-validate.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import type { User } from 'common/decorators/current-user.decorator';
import { Roles } from 'common/decorators/roles.decorator';
import { RolesGuard } from 'modules/auth/roles.guard';
import type { UpdateChildHealthEducationBody } from './schemas/update-child-health-education.schema';
import { updateChildHealthEducation } from './schemas/update-child-health-education.schema';

@Controller('child')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post('signup')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  @ZodValidate({ body: createChildBodySchema })
  async create(
    @CurrentUser() user: User,
    @Body() createChildDto: CreateChildBody,
  ) {
    return this.childService.create(createChildDto, user.id);
  }

  @Put('health-education/:childId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  @ZodValidate({ body: updateChildHealthEducation })
  async updateHealthEducation(
    @CurrentUser() user: User,
    @Body() updateChildHealthEducationBody: UpdateChildHealthEducationBody,
    @Param('childId') childId: string,
  ) {
    console.log(updateChildHealthEducationBody, childId, user.id);

    return this.childService.updateHealthEducation(
      updateChildHealthEducationBody,
      childId,
      user.id,
    );
  }
}
