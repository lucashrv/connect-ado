import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from 'config/env/env.validation';
import { InstitutionModule } from './modules/institution/institution.module';
import { AdopterModule } from 'modules/adopter/adopter.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChildModule } from 'modules/child/child.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    PrismaModule,
    InstitutionModule,
    AdopterModule,
    AuthModule,
    ChildModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
