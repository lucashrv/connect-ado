import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateChildBody } from '../schemas/create-child.schema';
import { UpdateChildHealthEducationBody } from '../schemas/update-child-health-education.schema';
import { UpdateChildManualBody } from '../schemas/update-ChildPersonalManual.schema';

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
          cpf: data.cpf,
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

  async updateHealthEducation(
    data: UpdateChildHealthEducationBody,
    childId: string,
  ) {
    return this.prisma.child.update({
      where: { id: childId },
      data: {
        health_record: data.health_record,
        education_level: data.education_level,
      },
    });
  }

  async updatePersonalManual(childId: string, data: UpdateChildManualBody) {
    return this.prisma.childPersonalManual.update({
      where: { child_id: childId },
      data: {
        daily_routine: data.daily_routine,
        favorite_food: data.favorite_food,
        favorite_music: data.favorite_music,
        favorite_activity: data.favorite_activity,
        hobbies: data.hobbies,
        study_habits: data.study_habits,
        fears: data.fears,
        notes: data.notes,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.child.findUnique({
      where: { id },
    });
  }

  async findInstitution(id: string) {
    return this.prisma.institution.findUnique({
      where: { user_id: id },
    });
  }
}
