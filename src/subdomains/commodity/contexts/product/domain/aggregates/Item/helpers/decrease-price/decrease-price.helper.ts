import {
  DecreasePriceEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

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
