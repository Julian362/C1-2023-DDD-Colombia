import { ItemDomainEntity } from '@context/product/domain/entities';
import { ConvertedCurrencyEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';

/**
 * helper para convertir la moneda de un producto
 *
 * @param {string} itemId - id del producto
 * @param {string} currency - moneda a convertir
 * @param {number} price - precio del producto
 * @param {ConvertedCurrencyEventPublisher<ItemDomainEntity>} convertCurrencyEP - evento publicador de cambio de moneda de producto
 * @param {(IItemDomainService )} itemService - servicio de producto
 * @return {Promise<ItemDomainEntity>} - retorna una promesa con el producto con la moneda convertida
 */
export const ConvertCurrencyHelper = async (
  itemId: string,
  currency: string,
  price: number,
  convertCurrencyEP?: ConvertedCurrencyEventPublisher<ItemDomainEntity>,
  itemService?: IItemDomainService,
): Promise<ItemDomainEntity> => {
  if (!itemService)
    throw new AggregateRootException('El servicio de item no existe');
  if (!convertCurrencyEP)
    throw new AggregateRootException(
      'El evento publicador de cambio de moneda de producto no existe',
    );
  convertCurrencyEP.response = await itemService.convertCurrency(
    itemId,
    currency,
    price,
  );
  convertCurrencyEP.publish();
  return convertCurrencyEP.response;
};
