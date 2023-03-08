import {
  CategoryDomainEntity,
  ChangedDescriptionCategoryEventPublisher,
  ICategoryDomainService,
} from '@context/product/domain';

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
