import { PrismaService } from '../prisma/prisma.service';
import {
  ItemPreparation,
  ItemPrepInput,
  OrderPreparation,
} from './preparation.model';
import { Inject } from '@nestjs/common';

export class PreparationRepository {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) {}

  async createPreparation(
    orderId: number,
    items: ItemPrepInput[],
  ): Promise<OrderPreparation> {
    const orderPreparation = await this.prismaService.orderPrepration.create({
      data: {
        orderId,
        orderItems: {
          create: items.map((item) => ({
            itemId: item.itemId,
            quantity: item.quantity,
            name: item.name,
            isReady: false,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return {
      id: orderPreparation.id,
      orderId: orderPreparation.orderId,
      items: orderPreparation.orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        isReady: item.isReady,
        quantity: item.quantity,
      })),
    };
  }

  async findPreparation(orderId: number): Promise<OrderPreparation | null> {
    const orderPreparation = await this.prismaService.orderPrepration.findFirst(
      {
        where: { orderId },
        include: {
          orderItems: true,
        },
      },
    );

    return orderPreparation
      ? {
          id: orderPreparation.id,
          orderId: orderPreparation.orderId,
          items: orderPreparation.orderItems.map((item) => ({
            id: item.id,
            name: item.name,
            isReady: item.isReady,
            quantity: item.quantity,
          })),
        }
      : null;
  }

  async exists(orderId: number): Promise<boolean> {
    const result = await this.prismaService.orderPrepration.findFirst({
      where: { orderId },
    });

    return !!result;
  }

  async updateItemReady(
    itemPreparationId: number,
    isReady: boolean,
  ): Promise<ItemPreparation> {
    const itemPreparation = await this.prismaService.itemPrepration.update({
      where: { id: itemPreparationId },
      data: { isReady },
    });

    return {
      id: itemPreparation.id,
      name: itemPreparation.name,
      isReady: itemPreparation.isReady,
      quantity: itemPreparation.quantity,
    };
  }

  async getAllPreparations() {
    const orderPreparations = await this.prismaService.orderPrepration.findMany(
      {
        include: {
          orderItems: true,
        },
      },
    );

    return orderPreparations.map((orderPreparation) => ({
      id: orderPreparation.id,
      orderId: orderPreparation.orderId,
      items: orderPreparation.orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        isReady: item.isReady,
        quantity: item.quantity,
      })),
    }));
  }
}
