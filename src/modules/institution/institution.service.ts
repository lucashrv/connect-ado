import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
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

  async linkAdopterToChild(childId: string, adopterId: string, userId: string) {
    const institution = await this.repository.getInstitution(userId);

    if (!institution) {
      throw new NotFoundException('Instituição não encontrado');
    }

    const child = await this.repository.findChildById(childId, institution.id);

    if (!child) {
      throw new NotFoundException(
        'Criança ou adolescente em acolhimento não encontrado',
      );
    }

    if (child.adopter_id) {
      throw new BadRequestException(
        'Criança já possui vínculo com um adotante',
      );
    }

    const adopter = await this.repository.findAdopterById(
      adopterId,
      institution.id,
    );

    if (!adopter) {
      throw new NotFoundException('Adotante não encontrado');
    }

    return this.repository.linkAdopterToChild(childId, adopterId);
  }

  async getInstitution(institutionId: string) {
    return await this.repository.getInstitution(institutionId);
  }

  async getAdoptersAndChildsNotLinked(institutionId: string) {
    return await this.repository.getAdoptersAndChildsNotLinked(institutionId);
  }
}
