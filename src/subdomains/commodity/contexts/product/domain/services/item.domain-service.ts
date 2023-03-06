import { ItemDomainEntity } from '../entities/item.domain-entity';

/**
 *  interface que representa el servicio de dominio de item
 *
 * @export
 * @interface IItemDomainService
 * @template Entity
 */
export interface IItemDomainService<Entity extends ItemDomainEntity> {
  /**
   *  obtiene un item
   *
   * @param {string} itemId
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  getItem(itemId: string): Promise<Entity>;
  /**
   *  obtiene todos los items
   *
   * @return {*}  {Promise<Entity[]>}
   * @memberof IItemDomainService
   */
  getAllItems(): Promise<Entity[]>;
  /**
   *  cambia el nombre del item
   *
   * @param {Entity} item
   * @param {string} name
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  changeName(item: Entity, name: string): Promise<Entity>;
  /**
   *  cambia la descripción del item
   *
   * @param {Entity} item
   * @param {string} description
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  changeDescription(item: Entity, description: string): Promise<Entity>;
  /**
   *  cambia el estado del item
   *
   * @param {Entity} item
   * @param {boolean} state
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  changeState(item: Entity, state: boolean): Promise<Entity>;
  /**
   *  cambia la imagen del item
   *
   * @param {Entity} item
   * @param {string} image
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  changeImage(item: Entity, image: string): Promise<Entity>;
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
    item: Entity,
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
  increasePrice(item: Entity, price: number): Promise<Entity>;
  /**
   *  disminuye el precio del item
   *
   * @param {Entity} item
   * @param {number} price
   * @return {*}  {Promise<Entity>}
   * @memberof IItemDomainService
   */
  decreasePrice(item: Entity, price: number): Promise<Entity>;
}
