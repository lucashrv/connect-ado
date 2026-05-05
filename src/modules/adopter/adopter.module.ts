import { Module } from '@nestjs/common';
import { AdopterService } from './adopter.service';
import { AdopterController } from './adopter.controller';
import { AdopterRepository } from './repositories/adopter.repository';

@Module({
  controllers: [AdopterController],
  providers: [AdopterService, AdopterRepository],
})
export class AdopterModule {}
