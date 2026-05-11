import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateChildBody } from '../schemas/create-child.schema';

@Injectable()
export class ChildRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateChildBody, institutionId: string) {
    const salt = Number(process.env.SALT ?? 10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.prisma.$transaction(async prisma => {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: 'CHILD',
        },
      });

      const child = await prisma.child.create({
        data: {
          full_name: data.full_name,
          nickname: data.nickname,
          birth_date: new Date(data.birth_date).toISOString(),
          gender: data.gender,
          user_id: user.id,
          institutionId,
        },
        include: { user: true },
      });

      await prisma.childPersonalManual.create({
        data: { child_id: child.id },
      });

      return child;
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findInstitution(id: string) {
    return this.prisma.institution.findUnique({
      where: { user_id: id },
    });
  }
}
