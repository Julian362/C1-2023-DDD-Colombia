import { ItemDomainEntity } from '@context/product/domain/entities';
import { IItemDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';
import { DecreasePriceHelper } from './decrease-price.helper';
import { DecreasePriceEventPublisher } from '../../../../events/publishers/decreased-price.event-publisher';
import { v4 as uuidv4 } from 'uuid';

describe('decreasePrice', () => {
  let service: IItemDomainService;
  let event: DecreasePriceEventPublisher;
  let entity: ItemDomainEntity;
  let helper: typeof DecreasePriceHelper;
  const id = uuidv4();

  beforeEach(() => {
    // Arrange
    service = {
      decreasePrice: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
      response: new ItemDomainEntity(),
    } as unknown as DecreasePriceEventPublisher;
    entity = new ItemDomainEntity({
      itemId: uuidv4(),
      name: 'Item',
      description: 'Description',
      price: 100,
      state: true,
    });
    // Act
    helper = DecreasePriceHelper;
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
    const result = () => helper(id, 50, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as DecreasePriceEventPublisher;
    const expected =
      'El evento publicador de cambio de precio de producto no existe';

    //Act
    const result = () => helper(id, 50, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un item', async () => {
    //Arrange
    service.decreasePrice = jest.fn().mockResolvedValue(entity);
    const expected = entity;

    //Act
    const result = () => helper(id, 50, event, service);

    //Assert
    expect(result).toEqual(expected);
  });

  it('debe llamar al método decreasePrice del servicio', async () => {
    //Arrange
    service.decreasePrice = jest.fn().mockResolvedValue(entity);

    //Act
    await helper(id, 50, event, service);

    //Assert
    expect(service.decreasePrice).toHaveBeenCalled();
  });

  it('debe llamar al método publish del evento con el item', async () => {
    //Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(id, 50, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalledWith(entity);
  });

  it('debe llamar al response del evento con el item', async () => {
    //Arrange
    service.decreasePrice = jest.fn().mockResolvedValue(entity);

    //Act
    await helper(id, 50, event, service);

    //Assert
    expect(event.response).toEqual(entity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
