import { ItemDomainEntity } from '../../entities/item.domain-entity';
export interface ICreatedITemResponse {
  success: boolean;
  item: ItemDomainEntity | null;
}
