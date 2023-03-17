import { ItemDomainEntity } from '@context/product/domain/entities';
import { IItemDomainService } from '@context/product/domain/services';
import { IncreasePriceHelper } from './increase-price.helper';
import { v4 as uuidv4 } from 'uuid';
import { IncreasePriceEventPublisher } from '@context/product/domain/events';
import { AggregateRootException } from '../../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
describe('increasePrice', () => {
  let service: IItemDomainService;
  let event: IncreasePriceEventPublisher;
  let entity: ItemDomainEntity;
  let helper: typeof IncreasePriceHelper;
  const id = uuidv4();
  const price = 100;

  beforeEach(() => {
    // Arrange
    service = {
      increasePrice: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
      response: new ItemDomainEntity(),
    } as unknown as IncreasePriceEventPublisher;
    entity = new ItemDomainEntity({
      itemId: uuidv4(),
      name: 'Item',
      description: 'Description',
      price: 100,
      state: true,
    });
    // Act
    helper = IncreasePriceHelper;
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
    const result = () => helper(id, price, event, service);

    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as IncreasePriceEventPublisher;
    const expected =
      'El evento publicador de cambio de precio de producto no existe';

    //Act
    const result = () => helper(id, price, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('retorna un objeto de tipo ItemDomainEntity', async () => {
    //Arrange
    service.increasePrice = jest.fn().mockReturnValue(new ItemDomainEntity());
    const expected = new ItemDomainEntity();

    //Act
    const result = await helper(id, price, event, service);

    //Assert
    expect(result).toEqual(expected);
  });

  it('debe llamar al método increasePrice del servicio', async () => {
    //Act
    await helper(id, price, event, service);

    //Assert
    expect(service.increasePrice).toHaveBeenCalledWith(id, price);
  });

  it('debe llamar al método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');
    //Act
    await helper(id, price, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar al response del evento', async () => {
    //Arrange
    service.increasePrice = jest.fn().mockReturnValue(new ItemDomainEntity());
    //Act
    await helper(id, price, event, service);

    //Assert
    expect(event.response).toEqual(new ItemDomainEntity());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
