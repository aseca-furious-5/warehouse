import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PreparationService } from './preparation.service';
import {
  ItemPreparation,
  ItemPrepInput,
  OrderPreparation,
} from './preparation.model';

@Controller('preparation')
export class PreparationController {
  constructor(private readonly preparationService: PreparationService) {}

  @Get('/all')
  async getAllPreparations(): Promise<OrderPreparation[]> {
    return this.preparationService.getAllPreparations();
  }

  @Post('/:orderId')
  async createPreparation(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() items: ItemPrepInput[],
  ): Promise<OrderPreparation> {
    return this.preparationService.createPreparation(orderId, items);
  }

  @Get('/:orderId')
  async getPreparation(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<OrderPreparation> {
    return this.preparationService.getPreparation(orderId);
  }

  @Put('/item/:itemPreparationId/ready')
  async setItemReady(
    @Param('itemPreparationId', ParseIntPipe) itemId: number,
  ): Promise<ItemPreparation> {
    return this.preparationService.setItemReady(itemId);
  }

  @Put('/item/:itemPreparationId/not-ready')
  async setItemNotReady(
    @Param('itemPreparationId', ParseIntPipe) itemId: number,
  ): Promise<ItemPreparation> {
    return this.preparationService.setItemNotReady(itemId);
  }
}
