import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidate } from 'common/decorators/zod-validate.decorator';
import { loginBodySchema } from './schemas/login.schema';
import type { LoginBody } from './schemas/login.schema';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import type { User } from 'common/decorators/current-user.decorator';
import { RolesGuard } from './roles.guard';
import { Roles } from 'common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ZodValidate({ body: loginBodySchema })
  async login(@Body() body: LoginBody) {
    return this.authService.login(body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('INSTITUTION', 'ADOPTER', 'CHILD')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
