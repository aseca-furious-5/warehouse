import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [HttpModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
