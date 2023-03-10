import {
  ChangedStateEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

/**
 * helper para cambiar el estado de un producto
 *
 * @param {string} itemId - id del producto
 * @param {boolean} state - estado a cambiar
 * @param {ChangedStateEventPublisher<ItemDomainEntity>} changedStateEP - evento publicador de cambio de estado de producto
 * @param {(IItemDomainService )} itemService - servicio de producto
 * @return {Promise<ItemDomainEntity>} retorna una promesa con el producto con el estado cambiado
 */
export const ChangeStateHelper = async (
  itemId: string,
  state: boolean,
  changedStateEP?: ChangedStateEventPublisher<ItemDomainEntity>,
  itemService?: IItemDomainService,
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
