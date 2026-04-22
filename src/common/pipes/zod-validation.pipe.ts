import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export type Schemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  param?: ZodSchema;
};

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schemas: Schemas) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const { type } = metadata;

    const schema = this.schemas[type as keyof Schemas];

    if (!schema) {
      throw new BadRequestException('Schema is required!');
    }

    const result = schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      throw new BadRequestException({
        message: 'Validation failed',
        source: type,
        errors,
      });
    }

    return result.data;
  }
}
