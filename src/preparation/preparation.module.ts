import { Module } from '@nestjs/common';
import { PreparationController } from './preparation.controller';
import { PreparationService } from './preparation.service';
import { PreparationRepository } from './preparation.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PreparationController],
  providers: [PreparationService, PreparationRepository],
})
export class PreparationModule {}
