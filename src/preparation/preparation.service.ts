import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PreparationRepository } from './preparation.repository';
import {
  ItemPreparation,
  ItemPrepInput,
  OrderPreparation,
} from './preparation.model';
import { OrderStatus } from '@prisma/client';
import { TowerService } from '../tower/tower.service';

@Injectable()
export class PreparationService {
  constructor(
    private readonly preparationRepository: PreparationRepository,
    private readonly towerService: TowerService,
  ) {}

  async createPreparation(
    orderId: number,
    items: ItemPrepInput[],
  ): Promise<OrderPreparation> {
    if (await this.preparationRepository.existsOrderPreparation(orderId)) {
      throw new ConflictException(
        `Preparation for order with id ${orderId} already exists`,
      );
    }
    return this.preparationRepository.createPreparation(orderId, items);
  }

  async getPreparation(orderId: number): Promise<OrderPreparation> {
    const orderPreparation =
      await this.preparationRepository.findPreparation(orderId);
    if (!orderPreparation) {
      throw new NotFoundException(
        `Preparation for order with id ${orderId} not found`,
      );
    }

    return orderPreparation;
  }

  async setItemReady(itemPreparationId: number): Promise<ItemPreparation> {
    return this.updateItemReady(itemPreparationId, true);
  }

  async setItemNotReady(itemPreparationId: number): Promise<ItemPreparation> {
    return this.updateItemReady(itemPreparationId, false);
  }

  private async updateItemReady(itemPreparationId: number, isReady: boolean) {
    if (
      !(await this.preparationRepository.existsItemPreparation(
        itemPreparationId,
      ))
    ) {
      throw new NotFoundException(
        `Item preparation with id ${itemPreparationId} not found`,
      );
    }

    return await this.preparationRepository.updateItemReady(
      itemPreparationId,
      isReady,
    );
  }

  async getAllPreparations(): Promise<OrderPreparation[]> {
    return this.preparationRepository.getAllPreparations();
  }

  async setPreparationStatus(id: number, status: OrderStatus) {
    const result = await this.preparationRepository.setPreparationStatus(
      id,
      status,
    );
    await this.towerService.updateStatus(result.orderId, status);
  }
}
