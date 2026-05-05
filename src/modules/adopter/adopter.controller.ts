import { Controller, Post, Body } from '@nestjs/common';
import { AdopterService } from './adopter.service';
import type { CreateAdopterBody } from './schemas/create-adopter.schema';
import { createAdopterBodySchema } from './schemas/create-adopter.schema';
import { ZodValidate } from 'common/decorators/zod-validate.decorator';

@Controller('adopter')
export class AdopterController {
  constructor(private readonly adopterService: AdopterService) {}

  @Post('signup')
  @ZodValidate({ body: createAdopterBodySchema })
  create(@Body() createAdopterDto: CreateAdopterBody) {
    return this.adopterService.create(createAdopterDto);
  }
}
