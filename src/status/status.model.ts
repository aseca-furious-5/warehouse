import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from './status.constant';

export class OrderStatusUpdate {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class Order {
  id: number;
  status: OrderStatus;
}
