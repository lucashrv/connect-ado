import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAdopterBody } from '../schemas/create-adopter.schema';

@Injectable()
export class AdopterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAdopterBody) {
    const salt = Number(process.env.SALT ?? 10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.prisma.$transaction(async prisma => {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: 'ADOPTER',
        },
      });

      return await prisma.adopter.create({
        data: {
          full_name: data.full_name,
          cpf: data.cpf,
          phone: data.phone,
          birth_date: new Date(data.birth_date).toISOString(),
          address: data.address,
          gender: data.gender,
          occupation: data.occupation,
          user_id: user.id,
        },
        include: { user: true },
      });
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByCpf(cpf: string) {
    return this.prisma.adopter.findUnique({
      where: { cpf },
    });
  }
}
