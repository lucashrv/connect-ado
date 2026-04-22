import { UsePipes } from '@nestjs/common';
import { Schemas, ZodValidationPipe } from '../pipes/zod-validation.pipe';

export function ZodValidate(schemas: Schemas) {
  return UsePipes(new ZodValidationPipe(schemas));
}
