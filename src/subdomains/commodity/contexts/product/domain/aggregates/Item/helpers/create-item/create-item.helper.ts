import {
  CreatedItemEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

export const CreateItemHelper = async (
  item: ItemDomainEntity,
  itemService: IItemDomainService | undefined,
  createItemEP: CreatedItemEventPublisher<ItemDomainEntity>,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!createItemEP)
    throw new Error('El evento publicador de creación de producto no existe');
  createItemEP.response = await itemService.createItem(item);
  createItemEP.publish();
  return createItemEP.response;
};
