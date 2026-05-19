import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { RolesGuard } from 'modules/auth/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { ZodValidate } from 'common/decorators/zod-validate.decorator';
import { createPostSchema } from './schemas/create-post.schema';
import type { CreatePostBody } from './schemas/create-post.schema';
import type { User } from 'common/decorators/current-user.decorator';

@Controller('posts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Roles('ADOPTER')
  @ZodValidate({ body: createPostSchema })
  async create(@CurrentUser() user: User, @Body() body: CreatePostBody) {
    return this.postService.create(body, user.id);
  }

  @Get('timeline')
  @Roles('CHILD')
  async getTimeline(@CurrentUser() user: User) {
    return this.postService.listTimeline(user.id);
  }

  @Patch(':postId/like')
  @Roles('CHILD')
  async toggleLike(@Param('postId') postId: string, @CurrentUser() user: User) {
    return this.postService.togglePostLike(postId, user.id);
  }
}
