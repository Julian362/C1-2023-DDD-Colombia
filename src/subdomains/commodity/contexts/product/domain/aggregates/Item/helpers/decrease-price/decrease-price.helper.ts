import {
  DecreasePriceEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

/**
 * helper para disminuir el precio de un producto
 *
 * @param {string} itemId id del producto
 * @param {number} price precio a disminuir
 * @param {DecreasePriceEventPublisher<ItemDomainEntity>} decreasePriceEP evento publicador de cambio de precio
 * @param {(IItemDomainService | undefined)} itemService servicio de producto
 * @return {Promise<ItemDomainEntity>} retorna una promesa con el producto con el precio disminuido
 */
export const DecreasePriceHelper = async (
  itemId: string,
  price: number,
  decreasePriceEP: DecreasePriceEventPublisher<ItemDomainEntity>,
  itemService: IItemDomainService | undefined,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!decreasePriceEP)
    throw new Error(
      'El evento publicador de cambio de precio de producto no existe',
    );
  decreasePriceEP.response = await itemService.decreasePrice(itemId, price);
  decreasePriceEP.publish();
  return decreasePriceEP.response;
};
