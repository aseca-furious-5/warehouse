import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StatusModule } from './status/status.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
