import { ItemDomainEntity } from '@context/product/domain/entities';
import { GotItemEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';
import { GetItemHelper } from './get-item.helper';
import { v4 as uuidv4 } from 'uuid';

describe('getItem', () => {
  let service: IItemDomainService;
  let event: GotItemEventPublisher;
  let entity: ItemDomainEntity;
  let helper: typeof GetItemHelper;
  const id = uuidv4();

  beforeEach(() => {
    // Arrange
    service = {
      getItem: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
      response: new ItemDomainEntity(),
    } as unknown as GotItemEventPublisher;
    entity = new ItemDomainEntity({
      itemId: uuidv4(),
      name: 'Item',
      description: 'Description',
      price: 100,
      state: true,
    });
    // Act
    helper = GetItemHelper;
  });

  it('debe ser definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no es definido', async () => {
    //Arrange
    service = undefined as unknown as IItemDomainService;
    const expected = 'El servicio de item no existe';

    //Act
    const result = () => helper(id, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as GotItemEventPublisher;
    const expected = 'El evento publicador de obtener producto no existe';

    //Act
    const result = () => helper(id, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un objeto de tipo ItemDomainEntity', async () => {
    //Arrange
    service.getItem = jest.fn().mockReturnValue(entity);

    //Act
    const result = await helper(id, service, event);

    //Assert
    expect(result).toBeInstanceOf(ItemDomainEntity);
  });

  it('debe retornar un objeto de tipo ItemDomainEntity con el mismo id', async () => {
    //Arrange
    service.getItem = jest.fn().mockReturnValue(entity);

    //Act
    const result = await helper(id, service, event);

    //Assert
    expect(result).toEqual(entity);
  });

  it('debe llamarse el método publish del evento', async () => {
    //Arrange
    service.getItem = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, service, event);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamarse el método publish del evento con un objeto de tipo ItemDomainEntity', async () => {
    //Arrange
    service.getItem = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, service, event);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamarse el response del evento', async () => {
    //Arrange
    service.getItem = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, service, event);

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
