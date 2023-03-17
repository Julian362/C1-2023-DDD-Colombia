import { CategoryDomainEntity } from '@context/product/domain/entities';
import { CreatedCategoryEventPublisher } from '@context/product/domain/events/publishers/created-category.event-publisher';
import { ICategoryDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';
import { v4 as uuidv4 } from 'uuid';
import { CreateCategoryHelper } from './create-category.helper';

describe('createCategory', () => {
  let service: ICategoryDomainService;
  let event: CreatedCategoryEventPublisher;
  let entity: CategoryDomainEntity;
  let helper: typeof CreateCategoryHelper;
  const id = uuidv4();

  beforeEach(() => {
    // Arrange
    service = {
      createCategory: jest.fn(),
    } as unknown as ICategoryDomainService;
    event = {
      publish: jest.fn(),
      response: new CategoryDomainEntity(),
    } as unknown as CreatedCategoryEventPublisher;
    entity = new CategoryDomainEntity({
      categoryId: uuidv4(),
      name: 'Category',
      description: 'Description',
      state: true,
    });
    // Act
    helper = CreateCategoryHelper;
  });

  it('debe ser definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no es definido', async () => {
    //Arrange
    service = undefined as unknown as ICategoryDomainService;
    const expected = 'El servicio de category no existe';

    //Act
    const result = () => helper(entity, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as CreatedCategoryEventPublisher;
    const expected = 'El evento publicador de creación de categoría no existe';

    //Act
    const result = () => helper(entity, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un category', async () => {
    //Arrange
    service.createCategory = jest.fn().mockResolvedValue(entity);
    const expected = entity;

    //Act
    const result = await helper(entity, service, event);

    //Assert
    expect(result).toEqual(expected);
  });
  it('debe llamar al método servicio de category', async () => {
    //Arrange
    service.createCategory = jest.fn().mockResolvedValue(entity);

    //Act
    await helper(entity, service, event);

    //Assert
    expect(service.createCategory).toHaveBeenCalledWith(entity);
  });
  it('debe llamar al método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(entity, service, event);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar al response del evento', async () => {
    //Arrange
    service.createCategory = jest.fn().mockResolvedValue(entity);

    //Act
    await helper(entity, service, event);

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
