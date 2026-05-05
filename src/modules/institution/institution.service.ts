import { ConflictException, Injectable } from '@nestjs/common';
import type { CreateInstitutionBody } from './schemas/create-institution.schema';
import { InstitutionsRepository } from './repositories/institution.repository';

@Injectable()
export class InstitutionService {
  constructor(private readonly repository: InstitutionsRepository) {}

  async create(createInstitutionDto: CreateInstitutionBody) {
    const existingInstitution = await this.repository.findByCnpj(
      createInstitutionDto.cnpj,
    );

    if (existingInstitution) {
      throw new ConflictException(
        'CNPJ de instituição já cadastrado no sistema',
      );
    }

    return this.repository.create(createInstitutionDto);
  }
}
