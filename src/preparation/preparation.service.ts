import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PreparationRepository } from './preparation.repository';
import {
  ItemPreparation,
  ItemPrepInput,
  OrderPreparation,
} from './preparation.model';

@Injectable()
export class PreparationService {
  constructor(private readonly preparationRepository: PreparationRepository) {}

  async createPreparation(
    orderId: number,
    items: ItemPrepInput[],
  ): Promise<OrderPreparation> {
    if (await this.preparationRepository.exists(orderId)) {
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
    if (!(await this.preparationRepository.exists(itemPreparationId))) {
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
}
