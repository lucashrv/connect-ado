import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { InstitutionsRepository } from './repositories/institution.repository';

@Module({
  controllers: [InstitutionController],
  providers: [InstitutionService, InstitutionsRepository],
})
export class InstitutionModule {}
