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
   * @param {string} sellerId id del vendedor
   * @return {Promise<Entity>} retorna una promesa con el vendedor
   * @memberof ISellerDomainService
   */
  getSeller(sellerId: string): Promise<Entity>;
  /**
   *  obtiene un vendedor por su email
   *
   * @param {string} sellerId id del vendedor
   * @param {string} name nombre del vendedor
   * @return {Promise<Entity>} retorna una promesa con el vendedor
   * @memberof ISellerDomainService
   */
  changeNameSeller(sellerId: string, name: string): Promise<Entity>;
  /**
   *  obtiene un vendedor por su email
   *
   * @param {string} sellerId id del vendedor
   * @param {boolean} state estado a cambia del vendedor
   * @return {Promise<Entity>} retorna una promesa con el vendedor
   * @memberof ISellerDomainService
   */
  changeStateSeller(sellerId: string, state: boolean): Promise<Entity>;
  /**
   *  cambia el email de un vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {string} email email del vendedor
   * @return {Promise<Entity>} retorna una promesa con el vendedor
   * @memberof ISellerDomainService
   */
  changeEmailSeller(sellerId: string, email: string): Promise<Entity>;
}
