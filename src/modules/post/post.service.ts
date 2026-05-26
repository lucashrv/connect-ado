/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { CreatePostBody } from './schemas/create-post.schema';
import { v2 as cloudinary } from 'cloudinary';
import 'multer';
import * as dotenv from 'dotenv';

@Injectable()
export class PostService {
  constructor(private readonly repository: PostRepository) {}

  async create(
    data: CreatePostBody,
    adopterUserId: string,
    file?: Express.Multer.File,
  ) {
    const adopter = await this.repository.findAdopterByUserId(adopterUserId);
    if (!adopter)
      throw new NotFoundException('Perfil de adotante não encontrado');

    let photoUrl: string | null = null;

    if (file) {
      dotenv.config();

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      photoUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'posts' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result?.secure_url || null);
          },
        );

        uploadStream.end(file.buffer);
      });
    }

    return this.repository.createPost(adopter.id, {
      ...data,
      photo_url: photoUrl,
    });
  }

  async togglePostLike(postId: string, childUserId: string) {
    const child = await this.repository.findChildByUserId(childUserId);
    if (!child) throw new NotFoundException('Perfil de criança não encontrado');
    if (!child.adopter_id)
      throw new UnauthorizedException(
        'Você ainda não possui um adotante vinculado',
      );

    const post = await this.repository.findPostById(postId);
    if (!post) throw new NotFoundException('Postagem não encontrada');

    if (post.adopter_id !== child.adopter_id) {
      throw new UnauthorizedException(
        'Você não tem permissão para interagir com este post',
      );
    }

    return this.repository.toggleLike(postId, post.isLiked);
  }

  async listTimeline(childUserId: string) {
    const child = await this.repository.findChildByUserId(childUserId);
    if (!child) throw new NotFoundException('Perfil de criança não encontrado');
    if (!child.adopter_id) return [];

    return this.repository.findPostsByAdopter(child.adopter_id);
  }
}
