import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StatusModule } from './status/status.module';
import { PrismaModule } from './prisma/prisma.module';
import { PreparationModule } from './preparation/preparation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StatusModule,
    PrismaModule,
    PreparationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
