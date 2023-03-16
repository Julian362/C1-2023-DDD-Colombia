import { CategoryDomainEntity } from '@context/product/domain/entities';
import { CreatedCategoryEventPublisher } from '@context/product/domain/events/publishers/created-category.event-publisher';
import { ICategoryDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';

/**
 * helper para crear un categoría
 *
 * @param {CategoryDomainEntity} category - categoría a crear
 * @param {(ICategoryDomainService )} categoryService - servicio de categoría
 * @param {CreatedCategoryEventPublisher<CategoryDomainEntity>} createCategoryEP - evento publicador de creación de categoría
 * @return {Promise<CategoryDomainEntity>} - retorna una promesa con el categoría creado
 */
export const CreateCategoryHelper = async (
  category: CategoryDomainEntity,
  categoryService?: ICategoryDomainService,
  createCategoryEP?: CreatedCategoryEventPublisher<CategoryDomainEntity>,
): Promise<CategoryDomainEntity> => {
  if (!categoryService)
    throw new AggregateRootException('El servicio de category no existe');
  if (!createCategoryEP)
    throw new AggregateRootException(
      'El evento publicador de creación de categoría no existe',
    );
  createCategoryEP.response = await categoryService.createCategory(category);
  createCategoryEP.publish();
  return createCategoryEP.response;
};
