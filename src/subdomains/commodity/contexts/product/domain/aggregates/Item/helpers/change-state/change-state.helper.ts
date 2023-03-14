import { ItemDomainEntity } from '@context/product/domain/entities';
import { ChangedStateEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '../../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';

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
  if (!itemService)
    throw new AggregateRootException('El servicio de Item no existe');
  if (!changedStateEP)
    throw new AggregateRootException(
      'El evento publicador de cambio de estado de producto no existe',
    );
  changedStateEP.response = await itemService.changeState(itemId, state);
  changedStateEP.publish();
  return changedStateEP.response;
};
