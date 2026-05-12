import { Controller, Post, Body, UseGuards, Patch, Get } from '@nestjs/common';
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
import { linkAdopterToChildBodySchema } from './schemas/link-adopter-to-child.schema';
import type { LinkAdopterToChildBody } from './schemas/link-adopter-to-child.schema';
import { RolesGuard } from 'modules/auth/roles.guard';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post('signup')
  @ZodValidate({ body: createInstitutionBodySchema })
  create(@Body() createInstitutionDto: CreateInstitutionBody) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Patch('link-adopter')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  @ZodValidate({ body: linkAdopterBodySchema })
  async linkAdopter(
    @CurrentUser() user: User,
    @Body() linkAdopterDto: LinkAdopterBody,
  ) {
    return this.institutionService.linkAdopter(linkAdopterDto, user.id);
  }

  @Patch('link-adopter-child')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  @ZodValidate({ body: linkAdopterToChildBodySchema })
  async linkAdopterToChild(
    @CurrentUser() user: User,
    @Body() linkAdopterToChildDto: LinkAdopterToChildBody,
  ) {
    return this.institutionService.linkAdopterToChild(
      linkAdopterToChildDto.childId,
      linkAdopterToChildDto.adopterId,
      user.id,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  async getInstitution(@CurrentUser() user: User) {
    return this.institutionService.getInstitution(user.id);
  }

  @Get('/get-adopters-childs-not-linked')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  async getAdoptersAndChildsNotLinked(@CurrentUser() user: User) {
    return this.institutionService.getAdoptersAndChildsNotLinked(user.id);
  }

  @Get('/get-adopters-not-linked-to-institution')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  async getAdoptersNotLinkedToInstitution() {
    return this.institutionService.getAdoptersNotLinkedToInstitution();
  }
}
