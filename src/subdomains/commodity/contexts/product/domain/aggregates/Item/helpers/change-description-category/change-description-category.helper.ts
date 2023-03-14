import { CategoryDomainEntity } from '@context/product/domain/entities';
import { ChangedDescriptionCategoryEventPublisher } from '@context/product/domain/events';
import { ICategoryDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '../../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';

/**
 * helper para cambiar la descripción de una categoría
 *
 * @param {string} categoryId - id de la categoría
 * @param {string} description - descripción a cambiar
 * @param {ChangedDescriptionCategoryEventPublisher<CategoryDomainEntity>} changedDescriptionCategoryEP - evento publicador de cambio de descripción de categoría
 * @param {(ICategoryDomainService )} categoryService - servicio de categoría
 * @return {Promise<CategoryDomainEntity>} - categoría con la descripción cambiada
 */
export const ChangeDescriptionCategoryHelper = async (
  categoryId: string,
  description: string,
  changedDescriptionCategoryEP?: ChangedDescriptionCategoryEventPublisher<CategoryDomainEntity>,
  categoryService?: ICategoryDomainService,
): Promise<CategoryDomainEntity> => {
  if (!categoryService)
    throw new AggregateRootException('El servicio de vendedor no existe');
  if (!changedDescriptionCategoryEP)
    throw new AggregateRootException(
      'El evento publicador de cambio de descripción de categoría no existe',
    );
  changedDescriptionCategoryEP.response =
    await categoryService.changeDescriptionCategory(categoryId, description);
  changedDescriptionCategoryEP.publish();
  return changedDescriptionCategoryEP.response;
};
