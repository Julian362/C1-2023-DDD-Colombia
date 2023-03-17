import { ItemDomainEntity } from '../../entities';

/**
 * interfaz para la respuesta de la obtencion de un item
 *
 * @export
 * @interface IGotITemResponse
 */
export interface IGotITemResponse {
  /**
   * item obtenido
   *
   * @type {(ItemDomainEntity | null)}
   * @memberof IGotITemResponse
   */
  item: ItemDomainEntity | null;
}
