import { IItemDomainService, ItemDomainEntity } from '@context/product/domain';
import { ChangedImageEventPublisher } from '../../../../events/publishers/changed-image.event-publisher';

export const ChangeImageHelper = async (
  itemId: string,
  image: string,
  changedImageEP: ChangedImageEventPublisher<ItemDomainEntity>,
  itemService: IItemDomainService | undefined,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!changedImageEP)
    throw new Error(
      'El evento publicador de cambio de imagen de producto no existe',
    );
  changedImageEP.response = await itemService.changeImage(itemId, image);
  changedImageEP.publish();
  return changedImageEP.response;
};
