import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChildBody } from './schemas/create-child.schema';
import { ChildRepository } from './repositories/child.repository';
import { UpdateChildHealthEducationBody } from './schemas/update-child-health-education.schema';
import { UpdateChildManualBody } from './schemas/update-ChildPersonalManual.schema';

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

    if (!child) throw new NotFoundException('Criança não encontrada');

    const institution =
      await this.repository.findInstitution(institutionUserId);

    if (!institution) throw new NotFoundException('Instituição não encontrada');

    if (child?.institutionId !== institution.id)
      throw new UnauthorizedException(
        'Criança pertencente a outra instituição',
      );

    return this.repository.updateHealthEducation(data, childId);
  }

  async updatePersonalManual(
    data: UpdateChildManualBody,
    childUserId: string,
    authenticatedUser: {
      id: string;
      role: 'INSTITUTION' | 'CHILD' | 'ADOPTER';
    },
  ) {
    const userChild = await this.repository.findUserById(childUserId);

    if (!userChild || !userChild.child)
      throw new NotFoundException('Criança não encontrada');

    if (userChild.child.user_id !== authenticatedUser.id) {
      throw new UnauthorizedException(
        'Você só pode alterar o seu próprio manual',
      );
    }

    return this.repository.updatePersonalManual(userChild.child.id, data);
  }

  async getPersonalManual(childUserId: string) {
    const userChild = await this.repository.findUserById(childUserId);

    if (!userChild || !userChild.child) return [];

    return this.repository.getPersonalManual(userChild.child.id);
  }

  async getPersonalManualByAdopter(adopterUserId: string) {
    const adopter = await this.repository.findAdopterByUserId(adopterUserId);
    if (!adopter) return [];

    const child = await this.repository.findChildByAdopterId(adopter.id);

    if (!child) return [];

    return this.repository.getPersonalManual(child.id);
  }
}
