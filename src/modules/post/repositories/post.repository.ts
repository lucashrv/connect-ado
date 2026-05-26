import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostBody } from '../schemas/create-post.schema';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAdopterByUserId(userId: string) {
    return this.prisma.adopter.findUnique({ where: { user_id: userId } });
  }

  async findChildByUserId(userId: string) {
    return this.prisma.child.findUnique({ where: { user_id: userId } });
  }
  async findInstitutionByUserId(userId: string) {
    return this.prisma.institution.findUnique({ where: { user_id: userId } });
  }

  async findPostById(postId: string) {
    return this.prisma.adopterPost.findUnique({ where: { id: postId } });
  }

  async createPost(adopterId: string, data: CreatePostBody) {
    return this.prisma.adopterPost.create({
      data: {
        title: data.title,
        content: data.content,
        photo_url: data.photo_url || null,
        adopter_id: adopterId,
      },
    });
  }

  async toggleLike(postId: string, currentStatus: boolean) {
    return this.prisma.adopterPost.update({
      where: { id: postId },
      data: { isLiked: !currentStatus },
    });
  }

  async findPostsByAdopter(adopterId: string) {
    return this.prisma.adopterPost.findMany({
      where: { adopter_id: adopterId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deletePost(postId: string) {
    return this.prisma.adopterPost.delete({
      where: { id: postId },
    });
  }
}
