import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateInstitutionBody } from '../schemas/create-institution.schema';

@Injectable()
export class InstitutionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInstitutionBody) {
    const salt = Number(process.env.SALT ?? 10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.prisma.$transaction(async prisma => {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: 'INSTITUTION',
        },
      });

      return await prisma.institution.create({
        data: {
          name: data.name,
          cnpj: data.cnpj,
          phone: data.phone,
          full_address: data.full_address,
          legal_representative_name: data.legal_representative_name,
          foundation_date: new Date(data.foundation_date),
          license_number: data.license_number,
          website_url: data.website_url ?? '',
          user_id: user.id,
        },
        include: { user: true },
      });
    });
  }

  async findByCnpj(cnpj: string) {
    return await this.prisma.institution.findUnique({ where: { cnpj } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
