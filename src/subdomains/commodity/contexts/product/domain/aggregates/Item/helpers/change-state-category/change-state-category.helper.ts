import { ICategoryDomainService } from '../../../../services/category.domain-service';
import {
  CategoryDomainEntity,
  ChangedStateCategoryEventPublisher,
} from '@context/product/domain';

/**
 * helper para cambiar el estado de una categoría
 *
 * @param {string} itemId - id de la categoría
 * @param {boolean} state - estado a cambiar
 * @param {ChangedStateCategoryEventPublisher<CategoryDomainEntity>} changedStateCategoryEventPublisher - evento publicador de cambio de estado de categoría
 * @param {(ICategoryDomainService )} categoryService - servicio de categoría
 * @return {Promise<CategoryDomainEntity>} retorna una promesa con la categoría con el estado cambiado
 */
export const ChangeStateCategoryHelper = async (
  itemId: string,
  state: boolean,
  changedStateCategoryEventPublisher?: ChangedStateCategoryEventPublisher<CategoryDomainEntity>,
  categoryService?: ICategoryDomainService,
): Promise<CategoryDomainEntity> => {
  if (!categoryService)
    throw new Error('el servicio del vendedor no está definido');
  if (!changedStateCategoryEventPublisher)
    throw new Error(
      'el evento publicador de cambio de estado de la categoría no está definido',
    );
  changedStateCategoryEventPublisher.response =
    await categoryService.changeStateCategory(itemId, state);
  changedStateCategoryEventPublisher.publish();
  return changedStateCategoryEventPublisher.response;
};
