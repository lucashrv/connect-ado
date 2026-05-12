import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChildBody } from './schemas/create-child.schema';
import { ChildRepository } from './repositories/child.repository';

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
}
