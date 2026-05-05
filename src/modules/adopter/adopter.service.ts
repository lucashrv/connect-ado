import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateAdopterBody } from './schemas/create-adopter.schema';
import { AdopterRepository } from './repositories/adopter.repository';

@Injectable()
export class AdopterService {
  constructor(private readonly repository: AdopterRepository) {}

  async create(createAdopterDto: CreateAdopterBody) {
    const findEmail = await this.repository.findByEmail(createAdopterDto.email);

    if (findEmail) {
      throw new BadRequestException('E-mail já cadastrado');
    }
    const findCpf = await this.repository.findByCpf(createAdopterDto.cpf);

    if (findCpf) {
      throw new BadRequestException('CPF já cadastrado');
    }

    return this.repository.create(createAdopterDto);
  }
}
