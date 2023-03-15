import { ItemDomainEntity } from '@context/product/domain/entities';
import { IItemDomainService } from '@context/product/domain/services';
import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { ItemEntity } from '../entities/item.entity';
@Injectable()
export class ItemService implements IItemDomainService {
  constructor(private readonly itemRepository: ItemRepository) {}
  getItem(itemId: string): Promise<ItemDomainEntity> {
    return this.itemRepository.findById(itemId);
  }
  changeName(itemId: string, name: string): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.name = name;
    return this.itemRepository.update(itemId, data);
  }
  changeDescription(
    itemId: string,
    description: string,
  ): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.description = description;
    return this.itemRepository.update(itemId, data);
  }
  changeState(itemId: string, state: boolean): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.state = state;
    return this.itemRepository.update(itemId, data);
  }
  changeImage(itemId: string, image: string): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.image = image;
    return this.itemRepository.update(itemId, data);
  }
  createItem(item: ItemDomainEntity): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.name = item.name?.valueOf() ?? '';
    data.description = item.description?.valueOf() ?? '';
    data.state = item.state?.valueOf() ?? false;
    data.image = item.image?.valueOf() ?? '';
    data.price = item.price?.valueOf() ?? 0;

    return this.itemRepository.create(data);
  }
  increasePrice(itemId: string, price: number): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.price += price;
    return this.itemRepository.update(itemId, data);
  }
  decreasePrice(itemId: string, price: number): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.price -= price;
    return this.itemRepository.update(itemId, data);
  }
}
