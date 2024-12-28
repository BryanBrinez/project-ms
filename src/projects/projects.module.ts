import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [NatsModule]
})
export class ProjectsModule {}
