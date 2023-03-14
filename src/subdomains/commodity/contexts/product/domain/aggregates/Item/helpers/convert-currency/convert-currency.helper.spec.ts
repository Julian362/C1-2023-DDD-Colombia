import { ItemDomainEntity } from '@context/product/domain/entities';
import { ConvertedCurrencyEventPublisher } from '@context/product/domain/events';
import { AggregateRootException } from '@sofka';
import { ConvertCurrencyHelper } from './convert-currency.helper';
import { v4 as uuidv4 } from 'uuid';
import { IItemDomainService } from '@context/product/domain/services';
describe('convertCurrency', () => {
  let service: IItemDomainService;
  let event: ConvertedCurrencyEventPublisher;
  let entity: ItemDomainEntity;
  let helper: typeof ConvertCurrencyHelper;
  const id = uuidv4();
  const currency = 'USD';
  const price = 100;

  beforeEach(() => {
    // Arrange
    service = {
      convertCurrency: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
      response: new ItemDomainEntity(),
    } as unknown as ConvertedCurrencyEventPublisher;
    entity = new ItemDomainEntity({
      itemId: uuidv4(),
      name: 'Item',
      description: 'Description',
      price: 100,
      state: true,
    });
    // Act
    helper = ConvertCurrencyHelper;
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
    const result = () => helper(id, currency, price, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as ConvertedCurrencyEventPublisher;
    const expected =
      'El evento publicador de cambio de moneda de producto no existe';

    //Act
    const result = () => helper(id, currency, price, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un item', async () => {
    //Arrange
    const expected = entity;
    service.convertCurrency = jest.fn().mockResolvedValue(expected);

    //Act
    await helper(id, currency, price, event, service);

    //Assert
    expect(service.convertCurrency).toEqual(expected);
  });

  it('debe llamar al método convertCurrency del evento', async () => {
    //Arrange
    const expected = entity;
    service.convertCurrency = jest.fn().mockResolvedValue(expected);

    //Act
    await helper(id, currency, price, event, service);

    //Assert
    expect(event.publish).toBeCalledWith(expected);
  });

  it('debe llamar al método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(id, currency, price, event, service);

    //Assert
    expect(event.publish).toBeCalled();
  });

  it('debe llamar al response del evento', async () => {
    //Arrange
    const expected = entity;
    service.convertCurrency = jest.fn().mockResolvedValue(expected);

    //Act
    await helper(id, currency, price, event, service);

    //Assert
    expect(event.response).toBe(expected);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
