import {
  ConvertedCurrencyEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

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
