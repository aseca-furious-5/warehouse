import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class OrderPreparation {
  id: number;
  orderId: number;
  items: ItemPreparation[];
  status: OrderStatus;
}

export class ItemPreparation {
  id: number;
  name: string;
  isReady: boolean;
  quantity: number;
}

export class ItemPrepInput {
  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
