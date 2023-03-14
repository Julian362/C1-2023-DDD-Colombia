import { ItemDomainEntity } from '@context/product/domain/entities';
import { CreatedItemEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';

/**
 * helper para crear un producto
 *
 * @param {ItemDomainEntity} item - producto a crear
 * @param {(IItemDomainService )} itemService - servicio de producto
 * @param {CreatedItemEventPublisher<ItemDomainEntity>} createItemEP - evento publicador de creación de producto
 * @return {Promise<ItemDomainEntity>} - retorna una promesa con el producto creado
 */
export const CreateItemHelper = async (
  item: ItemDomainEntity,
  itemService?: IItemDomainService,
  createItemEP?: CreatedItemEventPublisher<ItemDomainEntity>,
): Promise<ItemDomainEntity> => {
  if (!itemService)
    throw new AggregateRootException('El servicio de item no existe');
  if (!createItemEP)
    throw new AggregateRootException(
      'El evento publicador de creación de producto no existe',
    );
  createItemEP.response = await itemService.createItem(item);
  createItemEP.publish();
  return createItemEP.response;
};
