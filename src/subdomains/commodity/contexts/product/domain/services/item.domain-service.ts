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
   * @param {string} itemId id del item
   * @return {Promise<Entity>}  retorna una promesa con el item
   * @memberof IItemDomainService
   */
  getItem(itemId: string): Promise<Entity>;

  /**
   * cambia el nombre del item
   *
   * @param {string} itemId id del item
   * @param {string} name nombre del item a cambiar
   * @return {Promise<Entity>}  retorna una promesa con el item
   * @memberof IItemDomainService
   */
  changeName(itemId: string, name: string): Promise<Entity>;

  /**
   * cambia la descripción del item
   *
   * @param {string} itemId id del item
   * @param {string} description descripción a cambiar en el item
   * @return {Promise<Entity>} retorna una promesa con el item
   * @memberof IItemDomainService
   */
  changeDescription(itemId: string, description: string): Promise<Entity>;

  /**
   *  cambia el estado del item
   *
   * @param {string} itemId id del item
   * @param {boolean} state estado a cambiar del item
   * @return {Promise<Entity>} retorna una promesa con el item
   * @memberof IItemDomainService
   */
  changeState(itemId: string, state: boolean): Promise<Entity>;

  /**
   *  cambia la imagen del item
   *
   * @param {string} itemId id del item
   * @param {string} image  imagen a cambiar del item
   * @return {Promise<Entity>} retorna una promesa con el item
   * @memberof IItemDomainService
   */
  changeImage(itemId: string, image: string): Promise<Entity>;

  /**
   * crea un item
   *
   * @param {Entity} item item a crear
   * @return {Promise<Entity>}  retorna una promesa con el item creado
   * @memberof IItemDomainService
   */
  createItem(item: Entity): Promise<Entity>;

  /**
   *  elimina un item
   *
   * @param {string} itemId id del item
   * @param {string} currency moneda a convertir
   * @param {number} price precio a convertir
   * @return {Promise<Entity>} retorna una promesa con el item
   * @memberof IItemDomainService
   */
  convertCurrency(
    itemId: string,
    currency: string,
    price: number,
  ): Promise<Entity>;

  /**
   *
   *
   * @param {string} itemId id del item
   * @param {number} price precio a aumentar
   * @return {Promise<Entity>} retorna una promesa con el item
   * @memberof IItemDomainService
   */
  increasePrice(itemId: string, price: number): Promise<Entity>;

  /**
   *
   *
   * @param {string} itemId id del item
   * @param {number} price precio a disminuir
   * @return {Promise<Entity>} retorna una promesa con el item
   * @memberof IItemDomainService
   */
  decreasePrice(itemId: string, price: number): Promise<Entity>;
}
