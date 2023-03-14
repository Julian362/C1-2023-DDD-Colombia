import { ItemDomainEntity } from '@context/product/domain/entities';
import { CreatedItemEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';
import { CreateItemHelper } from './create-item.helper';
import { v4 as uuidv4 } from 'uuid';

describe('createItem', () => {
  let service: IItemDomainService;
  let event: CreatedItemEventPublisher;
  let entity: ItemDomainEntity;
  let helper: typeof CreateItemHelper;
  const id = uuidv4();

  beforeEach(() => {
    // Arrange
    service = {
      createItem: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
      response: new ItemDomainEntity(),
    } as unknown as CreatedItemEventPublisher;
    entity = new ItemDomainEntity({
      itemId: uuidv4(),
      name: 'Item',
      description: 'Description',
      price: 100,
      state: true,
    });
    // Act
    helper = CreateItemHelper;
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
    const result = () => helper(entity, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as CreatedItemEventPublisher;
    const expected = 'El evento publicador de creación de producto no existe';

    //Act
    const result = () => helper(entity, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un item', async () => {
    //Arrange
    service.createItem = jest.fn().mockResolvedValue(entity);
    const expected = entity;

    //Act
    const result = await helper(entity, service, event);

    //Assert
    expect(result).toEqual(expected);
  });
  it('debe llamar al método servicio de item', async () => {
    //Arrange
    service.createItem = jest.fn().mockResolvedValue(entity);

    //Act
    await helper(entity, service, event);

    //Assert
    expect(service.createItem).toHaveBeenCalledWith(entity);
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
    service.createItem = jest.fn().mockResolvedValue(entity);

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
