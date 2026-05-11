import { Controller, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import type { CreateInstitutionBody } from './schemas/create-institution.schema';
import { createInstitutionBodySchema } from './schemas/create-institution.schema';
import { ZodValidate } from 'common/decorators/zod-validate.decorator';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { Roles } from 'common/decorators/roles.decorator';
import type { User } from 'common/decorators/current-user.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { linkAdopterBodySchema } from './schemas/link-adopter.schema';
import type { LinkAdopterBody } from './schemas/link-adopter.schema';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post('signup')
  @ZodValidate({ body: createInstitutionBodySchema })
  create(@Body() createInstitutionDto: CreateInstitutionBody) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Patch('link-adopter')
  @UseGuards(JwtAuthGuard)
  @Roles('INSTITUTION')
  @ZodValidate({ body: linkAdopterBodySchema })
  async linkAdopter(
    @CurrentUser() user: User,
    @Body() linkAdopterDto: LinkAdopterBody,
  ) {
    return this.institutionService.linkAdopter(linkAdopterDto, user.id);
  }
}
