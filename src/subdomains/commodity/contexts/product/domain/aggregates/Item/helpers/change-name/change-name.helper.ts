import {
  ChangedNameEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

export const ChangeNameHelper = async (
  itemId: string,
  name: string,
  itemService: IItemDomainService | undefined,
  changedNameEP: ChangedNameEventPublisher<ItemDomainEntity>,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!changedNameEP)
    throw new Error(
      'El evento publicador de cambio de nombre de producto no existe',
    );
  changedNameEP.response = await itemService.changeName(itemId, name);
  changedNameEP.publish();
  return changedNameEP.response;
};
