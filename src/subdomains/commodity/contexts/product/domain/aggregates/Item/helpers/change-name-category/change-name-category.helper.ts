import {
  CategoryDomainEntity,
  ChangedNameCategoryEventPublisher,
  ICategoryDomainService,
} from '@context/product/domain';

export const ChangeNameCategoryHelper = async (
  categoryId: string,
  name: string,
  changedNameCategoryEventPublisher: ChangedNameCategoryEventPublisher<CategoryDomainEntity>,
  categoryService: ICategoryDomainService | undefined,
): Promise<CategoryDomainEntity> => {
  if (!changedNameCategoryEventPublisher)
    throw new Error(
      'El evento publicador de cambio de nombre de categoría no existe',
    );
  if (!categoryService) throw new Error('El servicio de categoría no existe');
  changedNameCategoryEventPublisher.response =
    await categoryService.changeNameCategory(categoryId, name);
  changedNameCategoryEventPublisher.publish();
  return changedNameCategoryEventPublisher.response;
};
