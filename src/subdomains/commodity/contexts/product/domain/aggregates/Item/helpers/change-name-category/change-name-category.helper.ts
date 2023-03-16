import { CategoryDomainEntity } from '@context/product/domain/entities';
import { ChangedNameCategoryEventPublisher } from '@context/product/domain/events';
import { ICategoryDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '../../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
import { GetDataOutContextService } from '../../../../../infrastructure/services/get-data-out-context.service';

/**
 * helper para cambiar el nombre de una categoría
 *
 * @param {string} categoryId - id de la categoría
 * @param {string} name - nombre a cambiar
 * @param {ChangedNameCategoryEventPublisher<CategoryDomainEntity>} changedNameCategoryEventPublisher - evento publicador de cambio de nombre de categoría
 * @param {(ICategoryDomainService )} categoryService - servicio de categoría
 * @return {Promise<CategoryDomainEntity>} retorna una promesa con la categoría con el nombre cambiado
 */
export const ChangeNameCategoryHelper = async (
  categoryId: string,
  name: string,
  changedNameCategoryEventPublisher?: ChangedNameCategoryEventPublisher<CategoryDomainEntity>,
  categoryService?: ICategoryDomainService,
): Promise<CategoryDomainEntity> => {
  if (!changedNameCategoryEventPublisher)
    throw new AggregateRootException(
      'El evento publicador de cambio de nombre de categoría no existe',
    );
  if (!categoryService)
    throw new AggregateRootException('El servicio de categoría no existe');
  changedNameCategoryEventPublisher.response =
    await categoryService.changeNameCategory(categoryId, name);
  changedNameCategoryEventPublisher.publish();
  return changedNameCategoryEventPublisher.response;
};
