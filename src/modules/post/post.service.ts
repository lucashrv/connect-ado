/* eslint-disable @typescript-eslint/no-floating-promises */
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
import { User } from 'common/decorators/current-user.decorator';

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

  async listTimeline(user: User) {
    let adopId: string = '';

    if (user.role === 'CHILD') {
      const child = await this.repository.findChildByUserId(user.id);

      if (!child)
        throw new NotFoundException('Perfil de criança não encontrado');

      adopId = child.adopter_id || '';

      if (!child.adopter_id) return [];
    } else if (user.role === 'ADOPTER') {
      const adopter = await this.repository.findAdopterByUserId(user.id);

      if (!adopter)
        throw new NotFoundException('Perfil do adotante não encontrado');

      adopId = adopter.id || '';

      if (!adopter.id) return [];
    }

    return this.repository.findPostsByAdopter(adopId);
  }

  async deletePost(postId: string, user: User) {
    const post = await this.repository.findPostById(postId);

    if (!post) {
      throw new NotFoundException('Postagem não encontrada');
    }

    const adopter = await this.repository.findAdopterByUserId(user.id);

    if (!adopter || post.adopter_id !== adopter.id) {
      throw new UnauthorizedException(
        'Você não tem permissão para deletar este post!',
      );
    }

    if (post.photo_url) {
      dotenv.config();

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const urlParts = post.photo_url.split('/');
      const folderAndFile = `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`;
      const publicId = folderAndFile.split('.')[0];

      await new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
      });
    }

    return this.repository.deletePost(post.id);
  }
}
