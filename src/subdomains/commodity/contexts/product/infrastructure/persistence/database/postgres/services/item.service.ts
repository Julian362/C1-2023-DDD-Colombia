import { ItemDomainEntity } from '@context/product/domain/entities';
import { IItemDomainService } from '@context/product/domain/services';
import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { ItemEntity } from '../entities/item.entity';
/**
 * clase que representa el servicio de dominio de item
 *
 * @export
 * @class ItemService
 * @implements {IItemDomainService}
 */
@Injectable()
export class ItemService implements IItemDomainService {
  /**
   * crea una instancia de ItemService
   * @param {ItemRepository} itemRepository
   * @memberof ItemService
   */
  constructor(private readonly itemRepository: ItemRepository) {}
  /**
   * obtiene un item
   *
   * @param {string} itemId id del item
   * @return {Promise<ItemDomainEntity>} retorna una promesa con el item
   * @memberof ItemService
   */
  getItem(itemId: string): Promise<ItemDomainEntity> {
    return this.itemRepository.findById(itemId);
  }
  /**
   * cambia el nombre del item
   *
   * @param {string} itemId id del item
   * @param {string} name nombre del item
   * @return {Promise<ItemDomainEntity>} retorna una promesa con el item
   * @memberof ItemService
   */
  changeName(itemId: string, name: string): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.name = name;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * cambia la descripción del item
   *
   * @param {string} itemId id del item
   * @param {string} description descripción del item
   * @return {Promise<ItemDomainEntity>}
   * @memberof ItemService
   */
  changeDescription(
    itemId: string,
    description: string,
  ): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.description = description;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * cambia el estado del item
   *
   * @param {string} itemId id del item
   * @param {boolean} state estado del item
   * @return {Promise<ItemDomainEntity>} retorna una promesa con el item
   * @memberof ItemService
   */
  changeState(itemId: string, state: boolean): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.state = state;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * cambia la imagen del item
   *
   * @param {string} itemId id del item
   * @param {string} image imagen del item
   * @return {Promise<ItemDomainEntity>} retorna una promesa con el item
   * @memberof ItemService
   */
  changeImage(itemId: string, image: string): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.image = image;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * crea un item
   *
   * @param {ItemDomainEntity} item item
   * @return {Promise<ItemDomainEntity>} retorna una promesa con el item
   * @memberof ItemService
   */
  createItem(item: ItemDomainEntity): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.name = item.name?.valueOf() ?? '';
    data.description = item.description?.valueOf() ?? '';
    data.state = item.state?.valueOf() ?? false;
    data.image = item.image?.valueOf() ?? '';
    data.price = item.price?.valueOf() ?? 0;

    return this.itemRepository.create(data);
  }
  /**
   * aumenta el precio del item
   *
   * @param {string} itemId id del item
   * @param {number} price precio del item
   * @return {Promise<ItemDomainEntity>} retorna una promesa con el item
   * @memberof ItemService
   */
  increasePrice(itemId: string, price: number): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.price += price;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * disminuye el precio del item
   *
   * @param {string} itemId id del item
   * @param {number} price precio del item
   * @return {Promise<ItemDomainEntity>} retorna una promesa con el item
   * @memberof ItemService
   */
  decreasePrice(itemId: string, price: number): Promise<ItemDomainEntity> {
    const data = new ItemEntity();
    data.price -= price;
    return this.itemRepository.update(itemId, data);
  }
}
