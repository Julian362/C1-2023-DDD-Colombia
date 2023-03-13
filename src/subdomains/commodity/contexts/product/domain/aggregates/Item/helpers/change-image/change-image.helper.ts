import { ItemDomainEntity } from '@context/product/domain/entities';
import { ChangedImageEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';

/**
 * helper para cambiar la imagen de un producto
 *
 * @param {string} itemId - id del producto
 * @param {string} image - imagen a cambiar
 * @param {ChangedImageEventPublisher<ItemDomainEntity>} changedImageEP - evento publicador de cambio de imagen de producto
 * @param {(IItemDomainService )} itemService - servicio de producto
 * @return {Promise<ItemDomainEntity>} - producto con la imagen cambiada
 */
export const ChangeImageHelper = async (
  itemId: string,
  image: string,
  changedImageEP?: ChangedImageEventPublisher<ItemDomainEntity>,
  itemService?: IItemDomainService,
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
