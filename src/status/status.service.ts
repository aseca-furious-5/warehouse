import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, OrderStatus } from './status.model';

@Injectable()
export class StatusService {
  private status: { id: number; status: OrderStatus }[] = [
    { id: 1, status: OrderStatus.PREPARING },
    { id: 2, status: OrderStatus.READY },
    { id: 3, status: OrderStatus.DISPATCHED },
  ];

  getAllPossibleStatuses(): OrderStatus[] {
    return Object.values(OrderStatus);
  }

  updateStatus(orderId: number, status: OrderStatus): Order {
    const order = this.status.find((order) => order.id === orderId);
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);
    order.status = status;
    return order;
  }

  getStatusById(orderId: number): Order {
    const order = this.status.find((order) => order.id === orderId);
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);
    return order;
  }
}
