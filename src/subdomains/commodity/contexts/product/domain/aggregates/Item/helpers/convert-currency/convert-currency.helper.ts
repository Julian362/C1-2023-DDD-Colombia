import {
  ConvertedCurrencyEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

/**
 * helper para convertir la moneda de un producto
 *
 * @param {string} itemId - id del producto
 * @param {string} currency - moneda a convertir
 * @param {number} price - precio del producto
 * @param {ConvertedCurrencyEventPublisher<ItemDomainEntity>} convertCurrencyEP - evento publicador de cambio de moneda de producto
 * @param {(IItemDomainService | undefined)} itemService - servicio de producto
 * @return {Promise<ItemDomainEntity>} - retorna una promesa con el producto con la moneda convertida
 */
export const ConvertCurrencyHelper = async (
  itemId: string,
  currency: string,
  price: number,
  convertCurrencyEP: ConvertedCurrencyEventPublisher<ItemDomainEntity>,
  itemService: IItemDomainService | undefined,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!convertCurrencyEP)
    throw new Error(
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
