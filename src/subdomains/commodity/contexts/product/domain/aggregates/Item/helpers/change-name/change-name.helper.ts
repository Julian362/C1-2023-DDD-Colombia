import { ItemDomainEntity } from '@context/product/domain/entities';
import { ChangedNameEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';

/**
 * helper para cambiar el nombre de un producto
 *
 * @param {string} itemId - id del producto
 * @param {string} name - nombre a cambiar
 * @param {(IItemDomainService )} itemService - servicio de producto
 * @param {ChangedNameEventPublisher<ItemDomainEntity>} changedNameEP - evento publicador de cambio de nombre de producto
 * @return {Promise<ItemDomainEntity>} - retorna una promesa con el producto con el nombre cambiado
 */
export const ChangeNameHelper = async (
  itemId: string,
  name: string,
  itemService?: IItemDomainService,
  changedNameEP?: ChangedNameEventPublisher<ItemDomainEntity>,
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
