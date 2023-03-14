import { CategoryDomainEntity } from '@context/product/domain/entities';
import { ChangedStateCategoryEventPublisher } from '@context/product/domain/events';
import { ICategoryDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';
import { v4 as uuidv4 } from 'uuid';
import { ChangeStateCategoryHelper } from './change-state-category.helper';

describe('changeStateCategorySeller', () => {
  let service: ICategoryDomainService;
  let event: ChangedStateCategoryEventPublisher;
  let entity: CategoryDomainEntity;
  let helper: typeof ChangeStateCategoryHelper;
  const id = uuidv4();
  const state = true;

  beforeEach(() => {
    // Arrange
    service = {
      changeStateCategory: jest.fn(),
    } as unknown as ICategoryDomainService;
    event = {
      publish: jest.fn(),
      response: new CategoryDomainEntity(),
    } as unknown as ChangedStateCategoryEventPublisher;
    entity = new CategoryDomainEntity({
      categoryId: uuidv4(),
      name: 'Category',
      description: 'Category description',
      state: true,
    });
    // Act
    helper = ChangeStateCategoryHelper;
  });

  it(' debe estar definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no está definido', async () => {
    //Arrange
    service = undefined as unknown as ICategoryDomainService;
    const expected = new AggregateRootException(
      'el servicio del vendedor no está definido',
    );

    //Act
    const result = helper(id, state, event, service);

    //Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no está definido', async () => {
    //Arrange
    event = undefined as unknown as ChangedStateCategoryEventPublisher;
    const expected = new AggregateRootException(
      'el evento publicador de cambio de estado de la categoría no está definido',
    );

    //Act
    const result = helper(id, state, event, service);

    //Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expected);
  });

  it('retorna una entidad de categoría con el estado cambiado', async () => {
    //Arrange
    service.changeStateCategory = jest.fn().mockReturnValue(entity);
    event.response = entity;

    //Act
    const result = await helper(id, state, event, service);

    //Assert
    expect(result).toEqual(entity);
  });

  it('debe llamar al método changeStateCategory del servicio', async () => {
    //Arrange
    service.changeStateCategory = jest.fn().mockReturnValue(entity);
    event.response = entity;

    //Act
    await helper(id, state, event, service);

    //Assert
    expect(service.changeStateCategory).toHaveBeenCalled();
  });

  it('debe llamar al método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(id, state, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar al response del evento', async () => {
    //Arrange
    service.changeStateCategory = jest.fn().mockReturnValue(entity);
    event.response = entity;

    //Act
    await helper(id, state, event, service);

    //Assert
    expect(event.response).toEqual(entity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
