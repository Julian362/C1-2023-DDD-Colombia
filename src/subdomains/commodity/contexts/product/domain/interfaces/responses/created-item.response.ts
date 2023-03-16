import { ItemDomainEntity } from '../../entities/item.domain-entity';
/**
 * interfaz para la respuesta de la creacion de un item
 *
 * @export
 * @interface ICreatedITemResponse
 */
export interface ICreatedITemResponse {
  success: boolean;
  item: ItemDomainEntity | null;
}
