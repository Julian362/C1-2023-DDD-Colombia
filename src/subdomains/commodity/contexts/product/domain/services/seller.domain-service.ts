import { SellerDomainEntity } from '../entities/seller.domain-entity';

/**
 *  interface que representa el servicio de dominio de vendedor
 *
 * @export
 * @interface ISellerDomainService
 * @template Entity
 */
export interface ISellerDomainService<
  Entity extends SellerDomainEntity = SellerDomainEntity,
> {
  /**
   *  obtiene un vendedor
   *
   * @param {string} sellerId
   * @return {*}  {Promise<Entity>}
   * @memberof ISellerDomainService
   */
  getSeller(sellerId: string): Promise<Entity>;
  /**
   *  cambia el nombre del vendedor
   *
   * @param {Entity} seller
   * @param {string} name
   * @return {*}  {Promise<Entity>}
   * @memberof ISellerDomainService
   */
  changeNameSeller(sellerId: string, name: string): Promise<Entity>;
  /**
   *  cambia el estado del vendedor
   *
   * @param {Entity} seller
   * @param {boolean} state
   * @return {*}  {Promise<Entity>}
   * @memberof ISellerDomainService
   */
  changeStateSeller(sellerId: string, state: boolean): Promise<Entity>;
  /**
   *  cambia la imagen del vendedor
   *
   * @param {Entity} seller
   * @param {string} email
   * @return {*}  {Promise<Entity>}
   * @memberof ISellerDomainService
   */
  changeEmailSeller(sellerId: string, email: string): Promise<Entity>;
}
