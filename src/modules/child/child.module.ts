import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';
import { ChildRepository } from './repositories/child.repository';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ChildController],
  providers: [ChildService, ChildRepository],
})
export class ChildModule {}
