import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Get,
  UseInterceptors,
  UploadedFile,
  Delete,
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
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Roles('ADOPTER')
  @UseInterceptors(FileInterceptor('photo'))
  @ZodValidate({ body: createPostSchema })
  async create(
    @CurrentUser() user: User,
    @Body() body: CreatePostBody,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.postService.create(body, user.id, file);
  }

  @Get('timeline')
  @Roles('CHILD', 'ADOPTER')
  async getTimeline(@CurrentUser() user: User) {
    return this.postService.listTimeline(user);
  }

  @Patch(':postId/like')
  @Roles('CHILD')
  async toggleLike(@Param('postId') postId: string, @CurrentUser() user: User) {
    return this.postService.togglePostLike(postId, user.id);
  }

  @Delete(':postId')
  @Roles('ADOPTER')
  async deletePost(@Param('postId') postId: string, @CurrentUser() user: User) {
    return this.postService.deletePost(postId, user);
  }
}
