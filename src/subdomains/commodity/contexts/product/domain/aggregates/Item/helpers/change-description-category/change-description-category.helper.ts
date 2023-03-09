import {
  CategoryDomainEntity,
  ChangedDescriptionCategoryEventPublisher,
  ICategoryDomainService,
} from '@context/product/domain';

/**
 * helper para cambiar la descripción de una categoría
 *
 * @param {string} categoryId - id de la categoría
 * @param {string} description - descripción a cambiar
 * @param {ChangedDescriptionCategoryEventPublisher<CategoryDomainEntity>} changedDescriptionCategoryEP - evento publicador de cambio de descripción de categoría
 * @param {(ICategoryDomainService | undefined)} categoryService - servicio de categoría
 * @return {Promise<CategoryDomainEntity>} - categoría con la descripción cambiada
 */
export const ChangeDescriptionCategoryHelper = async (
  categoryId: string,
  description: string,
  changedDescriptionCategoryEP: ChangedDescriptionCategoryEventPublisher<CategoryDomainEntity>,
  categoryService: ICategoryDomainService | undefined,
): Promise<CategoryDomainEntity> => {
  if (!categoryService) throw new Error('El servicio de vendedor no existe');
  if (!changedDescriptionCategoryEP)
    throw new Error(
      'El evento publicador de cambio de descripción de categoría no existe',
    );
  changedDescriptionCategoryEP.response =
    await categoryService.changeDescriptionCategory(categoryId, description);
  changedDescriptionCategoryEP.publish();
  return changedDescriptionCategoryEP.response;
};
