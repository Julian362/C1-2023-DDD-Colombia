import { ItemDomainEntity } from '@context/product/domain/entities';
import { IncreasePriceEventPublisher } from '@context/product/domain/events/publishers';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';

/**
 *  Helper para aumentar el precio de un producto
 *
 * @param {string} itemId - Id del producto
 * @param {number} price - Precio a aumentar
 * @param {IncreasePriceEventPublisher<ItemDomainEntity>} increasePriceEP - Evento publicador de cambio de precio de producto
 * @param {(IItemDomainService )} itemService - Servicio de producto
 * @return {Promise<ItemDomainEntity>}
 */
export const IncreasePriceHelper = async (
  itemId: string,
  price: number,
  increasePriceEP?: IncreasePriceEventPublisher<ItemDomainEntity>,
  itemService?: IItemDomainService,
): Promise<ItemDomainEntity> => {
  if (!itemService)
    throw new AggregateRootException('El servicio de item no existe');
  if (!increasePriceEP)
    throw new AggregateRootException(
      'El evento publicador de cambio de precio de producto no existe',
    );
  increasePriceEP.response = await itemService.increasePrice(itemId, price);
  increasePriceEP.publish();
  return increasePriceEP.response;
};
