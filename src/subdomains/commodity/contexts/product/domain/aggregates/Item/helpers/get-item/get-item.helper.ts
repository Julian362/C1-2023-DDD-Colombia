import { ItemDomainEntity } from '@context/product/domain/entities';
import { GotItemEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';

/**
 * helper para obtener un producto
 *
 * @param {string} itemId - Id del producto
 * @param {(IItemDomainService )} itemService - Servicio de producto
 * @param {GotItemEventPublisher<ItemDomainEntity>} gotItemEP - Evento publicador de obtener producto
 * @return {Promise<ItemDomainEntity>} - retorna una promesa con el producto
 */
export const GetItemHelper = async (
  itemId: string,
  itemService?: IItemDomainService,
  gotItemEP?: GotItemEventPublisher<ItemDomainEntity>,
): Promise<ItemDomainEntity> => {
  if (!itemService)
    throw new AggregateRootException('El servicio de item no existe');
  if (!gotItemEP)
    throw new AggregateRootException(
      'El evento publicador de obtener producto no existe',
    );
  gotItemEP.response = await itemService.getItem(itemId);
  gotItemEP.publish();
  return gotItemEP.response;
};
