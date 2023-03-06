import { SellerDomainEntity } from '../entities/seller.domain-entity';

/**
 *  interface que representa el servicio de dominio de vendedor
 *
 * @export
 * @interface ISellerDomainService
 * @template Entity
 */
export interface ISellerDomainService<Entity extends SellerDomainEntity> {
  /**
   *  obtiene un vendedor
   *
   * @param {string} sellerId
   * @return {*}  {Promise<Entity>}
   * @memberof ISellerDomainService
   */
  getSeller(sellerId: string): Promise<Entity>;
  /**
   *  obtiene todos los vendedores
   *
   * @return {*}  {Promise<Entity[]>}
   * @memberof ISellerDomainService
   */
  getAllSellers(): Promise<Entity[]>;
  /**
   *  cambia el nombre del vendedor
   *
   * @param {Entity} seller
   * @param {string} name
   * @return {*}  {Promise<Entity>}
   * @memberof ISellerDomainService
   */
  changeNameSeller(seller: Entity, name: string): Promise<Entity>;
  /**
   *  cambia la descripción del vendedor
   *
   * @param {Entity} seller
   * @param {string} description
   * @return {*}  {Promise<Entity>}
   * @memberof ISellerDomainService
   */
  changeDescriptionSeller(seller: Entity, description: string): Promise<Entity>;
  /**
   *  cambia el estado del vendedor
   *
   * @param {Entity} seller
   * @param {boolean} state
   * @return {*}  {Promise<Entity>}
   * @memberof ISellerDomainService
   */
  changeStateSeller(seller: Entity, state: boolean): Promise<Entity>;
  /**
   *  cambia la imagen del vendedor
   *
   * @param {Entity} seller
   * @param {string} email
   * @return {*}  {Promise<Entity>}
   * @memberof ISellerDomainService
   */
  changeEmailSeller(seller: Entity, email: string): Promise<Entity>;
}
