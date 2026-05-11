import { Module } from '@nestjs/common';
import { AdopterService } from './adopter.service';
import { AdopterController } from './adopter.controller';
import { AdopterRepository } from './repositories/adopter.repository';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AdopterController],
  providers: [AdopterService, AdopterRepository],
})
export class AdopterModule {}
