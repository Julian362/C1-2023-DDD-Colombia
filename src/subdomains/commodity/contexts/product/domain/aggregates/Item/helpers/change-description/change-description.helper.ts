import { ItemDomainEntity } from '@context/product/domain/entities';
import { ChangedDescriptionEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '../../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';

/**
 * helper para cambiar la descripción de un producto
 *
 * @param {string} itemId - id del producto
 * @param {string} description - descripción a cambiar
 * @param {ChangedDescriptionEventPublisher<ItemDomainEntity>} changedDescriptionEP - evento publicador de cambio de descripción de producto
 * @param {(IItemDomainService )} itemService - servicio de producto
 * @return {Promise<ItemDomainEntity>} retorna una promesa con el producto con la descripción cambiada
 */
export const ChangeDescriptionHelper = async (
  itemId: string,
  description: string,
  changedDescriptionEP?: ChangedDescriptionEventPublisher<ItemDomainEntity>,
  itemService?: IItemDomainService,
): Promise<ItemDomainEntity> => {
  if (!itemService)
    throw new AggregateRootException('El servicio de item no existe');
  if (!changedDescriptionEP)
    throw new AggregateRootException(
      'El evento publicador de cambio de descripción no existe',
    );
  changedDescriptionEP.response = await itemService.changeDescription(
    itemId,
    description,
  );
  changedDescriptionEP.publish();
  return changedDescriptionEP.response;
};
