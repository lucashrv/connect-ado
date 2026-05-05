import { Controller, Post, Body } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import type { CreateInstitutionBody } from './schemas/create-institution.schema';
import { createInstitutionBodySchema } from './schemas/create-institution.schema';
import { ZodValidate } from 'common/decorators/zod-validate.decorator';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post('signup')
  @ZodValidate({ body: createInstitutionBodySchema })
  create(@Body() createInstitutionDto: CreateInstitutionBody) {
    return this.institutionService.create(createInstitutionDto);
  }
}
