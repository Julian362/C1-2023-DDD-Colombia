import {
  CategoryDomainEntity,
  GotCategoryEventPublisher,
  ICategoryDomainService,
} from '@context/product/domain';

/**
 * helper para obtener una categoría
 *
 * @param {string} categoryId - Id de la categoría
 * @param {(ICategoryDomainService | undefined)} categoryService - Servicio de categoría
 * @param {GotCategoryEventPublisher<CategoryDomainEntity>} gotCategoryEventPublisher - Evento publicador de obtener categoría
 * @return {Promise<CategoryDomainEntity>} - retorna la promesa de una categoría
 */
export const GetCategoryHelper = async (
  categoryId: string,
  categoryService: ICategoryDomainService | undefined,
  gotCategoryEventPublisher: GotCategoryEventPublisher<CategoryDomainEntity>,
): Promise<CategoryDomainEntity> => {
  if (!categoryService) throw new Error('El servicio de categoría no existe');
  if (!gotCategoryEventPublisher)
    throw new Error('El evento publicador de obtener categoría no existe');
  gotCategoryEventPublisher.response = await categoryService.getCategory(
    categoryId,
  );
  gotCategoryEventPublisher.publish();
  return gotCategoryEventPublisher.response;
};
