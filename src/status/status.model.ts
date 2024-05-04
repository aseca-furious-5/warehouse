import { IsEnum, IsNotEmpty } from 'class-validator';

export enum OrderStatus {
  PREPARING = 'preparing',
  READY = 'ready',
  DISPATCHED = 'dispatched',
}

export class OrderStatusUpdate {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class Order {
  id: number;
  status: OrderStatus;
}
