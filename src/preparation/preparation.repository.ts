import { PrismaService } from '../prisma/prisma.service';
import {
  ItemPreparation,
  ItemPrepInput,
  OrderPreparation,
} from './preparation.model';
import { Inject } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';

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
      status: orderPreparation.status,
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
          status: orderPreparation.status,
        }
      : null;
  }

  async existsOrderPreparation(orderId: number): Promise<boolean> {
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

  async getAllPreparations(): Promise<OrderPreparation[]> {
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
      status: orderPreparation.status,
    }));
  }

  async existsItemPreparation(itemPreparationId: number) {
    const result = await this.prismaService.itemPrepration.findFirst({
      where: { id: itemPreparationId },
    });

    return !!result;
  }

  async setPreparationStatus(
    id: number,
    status: OrderStatus,
  ): Promise<OrderPreparation> {
    const result = await this.prismaService.orderPrepration.update({
      where: { id },
      data: { status },
      include: {
        orderItems: true,
      },
    });

    return {
      id: result.id,
      orderId: result.orderId,
      items: result.orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        isReady: item.isReady,
        quantity: item.quantity,
      })),
      status: result.status,
    };
  }
}
