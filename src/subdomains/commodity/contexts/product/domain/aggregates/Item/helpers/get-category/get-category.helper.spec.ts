import {
  ICategoryDomainEntity,
  ItemDomainEntity,
} from '@context/product/domain/entities';
import { GotCategoryEventPublisher } from '@context/product/domain/events';
import {
  ICategoryDomainService,
  IItemDomainService,
} from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';
import { GetCategoryHelper } from './get-category.helper';
import { v4 as uuidv4 } from 'uuid';
describe('getCategory', () => {
  let service: ICategoryDomainService;
  let event: GotCategoryEventPublisher;
  let entity: ICategoryDomainEntity;
  let helper: typeof GetCategoryHelper;
  const id = uuidv4();

  beforeEach(() => {
    // Arrange
    service = {
      getCategory: jest.fn(),
    } as unknown as ICategoryDomainService;
    event = {
      publish: jest.fn(),
      response: new ItemDomainEntity(),
    } as unknown as GotCategoryEventPublisher;
    entity = new ItemDomainEntity({
      itemId: uuidv4(),
      name: 'Item',
      description: 'Description',
      price: 100,
      state: true,
    });
    // Act
    helper = GetCategoryHelper;
  });

  it('debe ser definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no es definido', async () => {
    //Arrange
    service = undefined as unknown as ICategoryDomainService;
    const expected = 'El servicio de item no existe';

    //Act
    const result = () => helper(id, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as GotCategoryEventPublisher;
    const expected = 'El evento publicador de obtener categoría no existe';

    //Act
    const result = () => helper(id, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un item', async () => {
    //Arrange
    service.getCategory = jest.fn().mockReturnValue(entity);
    const expected = entity;

    //Act
    const result = await helper(id, service, event);

    //Assert
    expect(result).toEqual(expected);
  });

  it('debe llamar al método getCategory del servicio', async () => {
    //Arrange
    service.getCategory = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, service, event);

    //Assert
    expect(service.getCategory).toHaveBeenCalledWith(id);
  });

  it('debe llamar al método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(id, service, event);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar al response del evento', async () => {
    //Arrange
    service.getCategory = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, service, event);

    //Assert
    expect(event.response).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
