import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { CreatePostBody } from './schemas/create-post.schema';

@Injectable()
export class PostService {
  constructor(private readonly repository: PostRepository) {}

  async create(data: CreatePostBody, adopterUserId: string) {
    const adopter = await this.repository.findAdopterByUserId(adopterUserId);
    if (!adopter)
      throw new NotFoundException('Perfil de adotante não encontrado');

    return this.repository.createPost(adopter.id, data);
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
