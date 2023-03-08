import { ICategoryDomainService } from '../../../../services/category.domain-service';
import {
  CategoryDomainEntity,
  ChangedStateCategoryEventPublisher,
} from '@context/product/domain';

export const ChangeStateCategoryHelper = async (
  itemId: string,
  state: boolean,
  changedStateCategoryEventPublisher: ChangedStateCategoryEventPublisher<CategoryDomainEntity>,
  categoryService: ICategoryDomainService | undefined,
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
