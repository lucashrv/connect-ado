import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidate } from 'common/decorators/zod-validate.decorator';
import { loginBodySchema } from './schemas/login.schema';
import type { LoginBody } from './schemas/login.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ZodValidate({ body: loginBodySchema })
  async login(@Body() body: LoginBody) {
    return this.authService.login(body);
  }
}
