import { ItemDomainEntity } from '@context/product/domain/entities';
import { DecreasePriceEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';

/**
 * helper para disminuir el precio de un producto
 *
 * @param {string} itemId id del producto
 * @param {number} price precio a disminuir
 * @param {DecreasePriceEventPublisher<ItemDomainEntity>} decreasePriceEP evento publicador de cambio de precio
 * @param {(IItemDomainService )} itemService servicio de producto
 * @return {Promise<ItemDomainEntity>} retorna una promesa con el producto con el precio disminuido
 */
export const DecreasePriceHelper = async (
  itemId: string,
  price: number,
  decreasePriceEP?: DecreasePriceEventPublisher<ItemDomainEntity>,
  itemService?: IItemDomainService,
): Promise<ItemDomainEntity> => {
  if (!itemService)
    throw new AggregateRootException('El servicio de item no existe');
  if (!decreasePriceEP)
    throw new AggregateRootException(
      'El evento publicador de cambio de precio de producto no existe',
    );
  decreasePriceEP.response = await itemService.decreasePrice(itemId, price);
  decreasePriceEP.publish();
  return decreasePriceEP.response;
};
