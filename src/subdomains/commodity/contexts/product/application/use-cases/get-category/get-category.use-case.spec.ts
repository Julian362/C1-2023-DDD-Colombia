import { ItemAggregateRoot } from '@context/product/domain/aggregates';
import { ICategoryDomainService } from '@context/product/domain/services';
import { GetCategoryUseCase } from './get-category.use-case';
import { GotCategoryEventPublisher } from '@context/product/domain/events';
import { IGetCategoryCommand, IGotCategoryResponse } from '../../..';
import { ValueObjectException } from '@sofka';
import { CategoryDomainEntity } from '../../../domain/entities/category.domain-entity';

describe('GetCategoryUseCase', () => {
  let useCase: GetCategoryUseCase;
  let categoryService: ICategoryDomainService;
  let itemMock: ItemAggregateRoot;
  let event: GotCategoryEventPublisher;

  beforeEach(() => {
    categoryService = {
      getCategory: jest.fn().mockReturnValue({
        categoryId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
      }),
    } as unknown as ICategoryDomainService;
    event = {
      publish: jest.fn(),
    } as unknown as GotCategoryEventPublisher;
    useCase = new GetCategoryUseCase(categoryService, event);
    itemMock = {
      getCategory: jest.fn().mockResolvedValue({
        categoryId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
      }),
    } as unknown as ItemAggregateRoot;
    useCase = new GetCategoryUseCase(categoryService, event);
  });

  it('puede obtener una categoria', async () => {
    //Arrange
    const command: IGetCategoryCommand = {
      categoryId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
    };
    const category = new CategoryDomainEntity();
    //Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'itemAggregateRoot', { value: itemMock });
    const response: IGotCategoryResponse = await useCase.execute(command);

    //Assert
    expect(response.category).toEqual(command);
  });
  it('no puede obtener una categoria', async () => {
    //Arrange
    const command: IGetCategoryCommand = {
      categoryId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
    };
    //Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(true);
    Object.defineProperty(useCase, 'itemAggregateRoot', { value: itemMock });

    //Assert
    const result = () => useCase.execute(command);
    expect(result).rejects.toThrow(ValueObjectException);
  });
});
