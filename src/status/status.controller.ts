import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { Order, OrderStatusUpdate } from './status.model';

@Controller('status')
export class StatusController {
  constructor(private readonly service: StatusService) {}

  @Get('all')
  async getStatus() {
    return this.service.getAllPossibleStatuses();
  }

  @Get('/:order_id')
  async getStatusById(
    @Param('order_id', ParseIntPipe) orderId: number,
  ): Promise<Order> {
    return this.service.getStatusById(orderId);
  }

  @Put('/:order_id')
  async updateStatus(
    @Param('order_id', ParseIntPipe) orderId: number,
    @Body() body: OrderStatusUpdate,
  ): Promise<Order> {
    return this.service.updateStatus(orderId, body.status);
  }
}
