import { CategoryDomainEntity } from '@context/product/domain/entities';
import { GotCategoryEventPublisher } from '@context/product/domain/events';
import { ICategoryDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';

/**
 * helper para obtener una categoría
 *
 * @param {string} categoryId - Id de la categoría
 * @param {(ICategoryDomainService )} categoryService - Servicio de categoría
 * @param {GotCategoryEventPublisher<CategoryDomainEntity>} gotCategoryEventPublisher - Evento publicador de obtener categoría
 * @return {Promise<CategoryDomainEntity>} - retorna la promesa de una categoría
 */
export const GetCategoryHelper = async (
  categoryId: string,
  categoryService?: ICategoryDomainService,
  gotCategoryEventPublisher?: GotCategoryEventPublisher<CategoryDomainEntity>,
): Promise<CategoryDomainEntity> => {
  if (!categoryService)
    throw new AggregateRootException('El servicio de item no existe');
  if (!gotCategoryEventPublisher)
    throw new AggregateRootException(
      'El evento publicador de obtener categoría no existe',
    );
  gotCategoryEventPublisher.response = await categoryService.getCategory(
    categoryId,
  );
  gotCategoryEventPublisher.publish();
  return gotCategoryEventPublisher.response;
};
