import {
  IItemDomainService,
  IncreasePriceEventPublisher,
  ItemDomainEntity,
} from '@context/product/domain';

export const IncreasePriceHelper = async (
  itemId: string,
  price: number,
  increasePriceEP: IncreasePriceEventPublisher<ItemDomainEntity>,
  itemService: IItemDomainService | undefined,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!increasePriceEP)
    throw new Error(
      'El evento publicador de cambio de precio de producto no existe',
    );
  increasePriceEP.response = await itemService.increasePrice(itemId, price);
  increasePriceEP.publish();
  return increasePriceEP.response;
};
