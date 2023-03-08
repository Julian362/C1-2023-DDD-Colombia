import {
  ChangedDescriptionEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

export const ChangeDescriptionHelper = async (
  itemId: string,
  description: string,
  changedDescriptionEP: ChangedDescriptionEventPublisher<ItemDomainEntity>,
  itemService: IItemDomainService | undefined,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de item no existe');
  if (!changedDescriptionEP)
    throw new Error('El evento publicador de cambio de descripción no existe');
  changedDescriptionEP.response = await itemService.changeDescription(
    itemId,
    description,
  );
  changedDescriptionEP.publish();
  return changedDescriptionEP.response;
};
