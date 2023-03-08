import {
  GotItemEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

export const GetItemHelper = async (
  itemId: string,
  itemService: IItemDomainService | undefined,
  gotItemEP: GotItemEventPublisher<ItemDomainEntity>,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!gotItemEP)
    throw new Error('El evento publicador de obtener producto no existe');
  gotItemEP.response = await itemService.getItem(itemId);
  gotItemEP.publish();
  return gotItemEP.response;
};
