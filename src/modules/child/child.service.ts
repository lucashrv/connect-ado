import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChildBody } from './schemas/create-child.schema';
import { ChildRepository } from './repositories/child.repository';
import { UpdateChildHealthEducationBody } from './schemas/update-child-health-education.schema';

@Injectable()
export class ChildService {
  constructor(private readonly repository: ChildRepository) {}

  async create(createChildDto: CreateChildBody, institutionId: string) {
    const findEmail = await this.repository.findByEmail(createChildDto.email);

    if (findEmail) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const findInstitution =
      await this.repository.findInstitution(institutionId);

    if (!findInstitution)
      throw new NotFoundException('ID da instituição não encontrado');

    return this.repository.create(createChildDto, findInstitution.id);
  }

  async updateHealthEducation(
    data: UpdateChildHealthEducationBody,
    childId: string,
    institutionUserId: string,
  ) {
    const child = await this.repository.findById(childId);

    const institution =
      await this.repository.findInstitution(institutionUserId);

    if (!institution) throw new NotFoundException('Instituição não encontrada');

    if (child?.institutionId !== institution.id)
      throw new UnauthorizedException(
        'Criança pertencente a outra instituição',
      );

    return this.repository.updateHealthEducation(data, childId);
  }
}
