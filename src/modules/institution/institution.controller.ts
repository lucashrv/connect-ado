import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Get,
  Query,
  Param,
} from '@nestjs/common';
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
import {
  listParamsSchema,
  type ListParams,
} from './schemas/list-adopter-child.schema';

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

  @Get('/childrens')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  @ZodValidate({ query: listParamsSchema })
  async listChildren(@CurrentUser() user: User, @Query() query: ListParams) {
    return this.institutionService.listChildren(user.id, query);
  }

  @Get('/adopters')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  @ZodValidate({ query: listParamsSchema })
  async listAdopters(@CurrentUser() user: User, @Query() query: ListParams) {
    return this.institutionService.listAdopters(user.id, query);
  }

  @Patch('unlink-adopter-child/:childId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  async unlinkAdopterChild(
    @CurrentUser() user: User,
    @Param('childId') childId: string,
  ) {
    return this.institutionService.unlinkAdopterChild(childId, user.id);
  }

  @Patch('unlink-adopter-institution/:adopterId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION')
  async unlinkAdopterInstitution(
    @CurrentUser() user: User,
    @Param('adopterId') adopterId: string,
  ) {
    return this.institutionService.unlinkAdopterInstitution(adopterId, user.id);
  }
}
