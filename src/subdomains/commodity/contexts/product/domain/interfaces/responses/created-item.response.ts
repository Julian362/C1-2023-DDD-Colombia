import { ItemDomainEntity } from '../../entities/item.domain-entity';
/**
 * interfaz para la respuesta de la creacion de un item
 *
 * @export
 * @interface ICreatedITemResponse
 */
export interface ICreatedITemResponse {
  /**
   * estado de la respuesta
   *
   * @type {boolean}
   * @memberof ICreatedITemResponse
   */
  success: boolean;
  /**
   * item creado
   *
   * @type {(ItemDomainEntity | null)}
   * @memberof ICreatedITemResponse
   */
  item: ItemDomainEntity | null;
}
