import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { InstitutionsRepository } from './repositories/institution.repository';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [InstitutionController],
  providers: [InstitutionService, InstitutionsRepository],
})
export class InstitutionModule {}
