import {
  ChangedStateEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

export const ChangeStateHelper = async (
  itemId: string,
  state: boolean,
  changedStateEP: ChangedStateEventPublisher<ItemDomainEntity>,
  itemService: IItemDomainService | undefined,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!changedStateEP)
    throw new Error(
      'El evento publicador de cambio de estado de producto no existe',
    );
  changedStateEP.response = await itemService.changeState(itemId, state);
  changedStateEP.publish();
  return changedStateEP.response;
};
