import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [AuthModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
