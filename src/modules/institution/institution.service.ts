import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import type { CreateInstitutionBody } from './schemas/create-institution.schema';
import { InstitutionsRepository } from './repositories/institution.repository';
import { LinkAdopterBody } from './schemas/link-adopter.schema';

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

    const findEmail = await this.repository.findByEmail(
      createInstitutionDto.email,
    );

    if (findEmail) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    return this.repository.create(createInstitutionDto);
  }

  async linkAdopter(linkAdopterDto: LinkAdopterBody, institutionId: string) {
    const user = await this.repository.findByEmail(linkAdopterDto.email);

    if (!user || (!!user && user.role !== 'ADOPTER')) {
      throw new BadRequestException(
        'Email inválido ou não pertence a um adotante',
      );
    }

    return this.repository.linkAdopter(user.id, institutionId);
  }

  async getInstitution(institutionId: string) {
    return await this.repository.getInstitution(institutionId);
  }
}
