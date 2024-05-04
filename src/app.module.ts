import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';

@Module({
  imports: [],
  controllers: [AppController, StatusController],
  providers: [AppService, StatusService],
})
export class AppModule {}
