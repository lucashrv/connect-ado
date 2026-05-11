import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';
import { ChildRepository } from './repositories/child.repository';

@Module({
  controllers: [ChildController],
  providers: [ChildService, ChildRepository],
})
export class ChildModule {}
