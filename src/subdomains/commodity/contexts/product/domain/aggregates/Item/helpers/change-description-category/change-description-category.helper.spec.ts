import { CategoryDomainEntity } from '@context/product/domain/entities';
import { ChangedDescriptionCategoryEventPublisher } from '@context/product/domain/events';
import { ICategoryDomainService } from '@context/product/domain/services';
import { ChangeDescriptionCategoryHelper } from './change-description-category.helper';
import { v4 as uuidv4 } from 'uuid';
import { AggregateRootException } from '@sofka';

describe('changeDescriptionCategory', () => {
  let service: ICategoryDomainService;
  let event: ChangedDescriptionCategoryEventPublisher;
  let entity: CategoryDomainEntity;
  let helper: typeof ChangeDescriptionCategoryHelper;
  const id = uuidv4();
  const description = 'Nueva descripción';

  beforeEach(() => {
    // Arrange
    service = {
      changeDescription: jest.fn(),
    } as unknown as ICategoryDomainService;
    event = {
      publish: jest.fn(),
      response: new CategoryDomainEntity(),
    } as unknown as ChangedDescriptionCategoryEventPublisher;
    entity = new CategoryDomainEntity({
      categoryId: uuidv4(),
      name: 'Categoría 1',
      state: true,
      description: 'Descripción de la categoría 1',
    });

    // Act
    helper = ChangeDescriptionCategoryHelper;
  });

  it('debe ser definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no es definido', async () => {
    //Arrange
    service = undefined as unknown as ICategoryDomainService;
    const expected = 'El servicio de vendedor no existe';

    //Act
    const result = () => helper(id, description, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento publicador no es definido', async () => {
    //Arrange
    event = undefined as unknown as ChangedDescriptionCategoryEventPublisher;
    const expected =
      'El evento publicador de cambio de descripción de categoría no existe';

    //Act
    const result = () => helper(id, description, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar una categoría con la descripción cambiada', async () => {
    //Arrange
    service.changeDescriptionCategory = jest.fn().mockReturnValue(entity);
    const expected = entity;

    //Act
    const result = await helper(id, description, event, service);

    //Assert
    expect(result).toEqual(expected);
  });

  it('debe llamar service.changeDescriptionCategory', async () => {
    //Arrange
    service.changeDescriptionCategory = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, description, event, service);

    //Assert
    expect(service.changeDescriptionCategory).toBeCalledWith(id, description);
  });

  it('debe llamar event.publish', async () => {
    //Arrange
    service.changeDescriptionCategory = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, description, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar event.response', async () => {
    //Arrange
    service.changeDescriptionCategory = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, description, event, service);

    //Assert
    expect(event.response).toEqual(entity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
