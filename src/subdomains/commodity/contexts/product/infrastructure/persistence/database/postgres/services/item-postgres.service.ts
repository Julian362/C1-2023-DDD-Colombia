import { IItemDomainService } from '@context/product/domain/services';
import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { ItemPostgresEntity } from '../entities/item-postgres.entity';
/**
 * clase que representa el servicio de dominio de item
 *
 * @export
 * @class ItemPostgresService
 * @implements {IItemDomainService}
 */
@Injectable()
export class ItemPostgresService
  implements IItemDomainService<ItemPostgresEntity>
{
  /**
   * crea una instancia de ItemPostgresService
   * @param {ItemRepository} itemRepository
   * @memberof ItemPostgresService
   */
  constructor(private readonly itemRepository: ItemRepository) {}
  /**
   * obtiene un item
   *
   * @param {string} itemId id del item
   * @return {Promise<ItemPostgresEntity>} retorna una promesa con el item
   * @memberof ItemPostgresService
   */
  getItem(itemId: string): Promise<ItemPostgresEntity> {
    return this.itemRepository.findById(itemId);
  }
  /**
   * cambia el nombre del item
   *
   * @param {string} itemId id del item
   * @param {string} name nombre del item
   * @return {Promise<ItemPostgresEntity>} retorna una promesa con el item
   * @memberof ItemPostgresService
   */
  changeName(itemId: string, name: string): Promise<ItemPostgresEntity> {
    const data = new ItemPostgresEntity();
    data.name = name;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * cambia la descripción del item
   *
   * @param {string} itemId id del item
   * @param {string} description descripción del item
   * @return {Promise<ItemPostgresEntity>}
   * @memberof ItemPostgresService
   */
  changeDescription(
    itemId: string,
    description: string,
  ): Promise<ItemPostgresEntity> {
    const data = new ItemPostgresEntity();
    data.description = description;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * cambia el estado del item
   *
   * @param {string} itemId id del item
   * @param {boolean} state estado del item
   * @return {Promise<ItemPostgresEntity>} retorna una promesa con el item
   * @memberof ItemPostgresService
   */
  changeState(itemId: string, state: boolean): Promise<ItemPostgresEntity> {
    const data = new ItemPostgresEntity();
    data.state = state;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * cambia la imagen del item
   *
   * @param {string} itemId id del item
   * @param {string} image imagen del item
   * @return {Promise<ItemPostgresEntity>} retorna una promesa con el item
   * @memberof ItemPostgresService
   */
  changeImage(itemId: string, image: string): Promise<ItemPostgresEntity> {
    const data = new ItemPostgresEntity();
    data.image = image;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * crea un item
   *
   * @param {ItemPostgresEntity} item item
   * @return {Promise<ItemPostgresEntity>} retorna una promesa con el item
   * @memberof ItemPostgresService
   */
  createItem(item: ItemPostgresEntity): Promise<ItemPostgresEntity> {
    return this.itemRepository.create(item);
  }
  /**
   * aumenta el precio del item
   *
   * @param {string} itemId id del item
   * @param {number} price precio del item
   * @return {Promise<ItemPostgresEntity>} retorna una promesa con el item
   * @memberof ItemPostgresService
   */
  increasePrice(itemId: string, price: number): Promise<ItemPostgresEntity> {
    const data = new ItemPostgresEntity();
    data.price += price;
    return this.itemRepository.update(itemId, data);
  }
  /**
   * disminuye el precio del item
   *
   * @param {string} itemId id del item
   * @param {number} price precio del item
   * @return {Promise<ItemPostgresEntity>} retorna una promesa con el item
   * @memberof ItemPostgresService
   */
  decreasePrice(itemId: string, price: number): Promise<ItemPostgresEntity> {
    const data = new ItemPostgresEntity();
    data.price -= price;
    return this.itemRepository.update(itemId, data);
  }
}
