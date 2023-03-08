import { ItemDomainEntity } from '../entities/item.domain-entity';

/**
 *  interface que representa el servicio de dominio de item
 *
 * @export
 * @interface IItemDomainService
 * @template Entity
 */
export interface IItemDomainService<
  Entity extends ItemDomainEntity = ItemDomainEntity,
> {
  /**
   *  obtiene un item
   *
   * @param {string} itemId
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  getItem(itemId: string): Promise<Entity>;
  /**
   *  cambia el nombre del item
   *
   * @param {Entity} item
   * @param {string} name
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  changeName(itemId: string, name: string): Promise<Entity>;
  /**
   *  cambia la descripción del item
   *
   * @param {Entity} item
   * @param {string} description
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  changeDescription(itemId: string, description: string): Promise<Entity>;
  /**
   *  cambia el estado del item
   *
   * @param {Entity} item
   * @param {boolean} state
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  changeState(itemId: string, state: boolean): Promise<Entity>;
  /**
   *  cambia la imagen del item
   *
   * @param {Entity} item
   * @param {string} image
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  changeImage(itemId: string, image: string): Promise<Entity>;
  /**
   *  crea un item
   *
   * @param {Entity} item
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  createItem(item: Entity): Promise<Entity>;
  /**
   *  convierte la moneda del item
   *
   * @param {Entity} item
   * @param {string} currency
   * @param {number} price
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  convertCurrency(
    itemId: string,
    currency: string,
    price: number,
  ): Promise<Entity>;
  /**
   *  aumenta el precio del item
   *
   * @param {Entity} item
   * @param {number} price
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  increasePrice(itemId: string, price: number): Promise<Entity>;
  /**
   *  disminuye el precio del item
   *
   * @param {Entity} item
   * @param {number} price
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  decreasePrice(itemId: string, price: number): Promise<Entity>;
}
