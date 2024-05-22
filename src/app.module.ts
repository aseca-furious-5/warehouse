import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TowerModule } from './tower/tower.module';
import { PrismaModule } from './prisma/prisma.module';
import { PreparationModule } from './preparation/preparation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TowerModule,
    PrismaModule,
    PreparationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
