import {
  ChangedDescriptionEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

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
