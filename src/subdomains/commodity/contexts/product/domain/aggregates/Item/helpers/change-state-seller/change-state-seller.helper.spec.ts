import { SellerDomainEntity } from '@context/product/domain/entities';
import { ChangedStateSellerEventPublisher } from '@context/product/domain/events';
import { ISellerDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';
import { ChangeStateSellerHelper } from './change-state-seller.helper';
import { v4 as uuidv4 } from 'uuid';

describe('changeStateSeller', () => {
  let service: ISellerDomainService;
  let event: ChangedStateSellerEventPublisher;
  let entity: SellerDomainEntity;
  let helper: typeof ChangeStateSellerHelper;
  const id = uuidv4();
  const state = true;

  beforeEach(() => {
    // Arrange
    service = {
      changeState: jest.fn(),
    } as unknown as ISellerDomainService;
    event = {
      publish: jest.fn(),
      response: new SellerDomainEntity(),
    } as unknown as ChangedStateSellerEventPublisher;
    entity = new SellerDomainEntity({
      sellerId: uuidv4(),
      name: 'Seller',
      email: 'julianga362@gmai.com',
      state: true,
    });
    // Act
    helper = ChangeStateSellerHelper;
  });

  it('debe ser definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no es definido', async () => {
    //Arrange
    service = undefined as unknown as ISellerDomainService;
    const expected = 'El servicio de seller no existe';

    //Act
    const result = () => helper(id, state, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as ChangedStateSellerEventPublisher;
    const expected =
      'El evento publicador de cambio de estado de vendedor no existe';

    //Act
    const result = () => helper(id, state, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un objeto de tipo SellerDomainEntity', async () => {
    //Arrange
    service.changeStateSeller = jest.fn().mockResolvedValue(entity);
    event.publish = jest.fn().mockResolvedValue(entity);
    const expected = entity;

    //Act
    const result = await helper(id, state, event, service);

    //Assert
    expect(result).toEqual(expected);
  });

  it('debe llamar al método changeState del servicio', async () => {
    //Arrange
    jest.spyOn(service, 'changeStateSeller');

    //Act
    await helper(id, state, event, service);

    //Assert
    expect(service.changeStateSeller).toHaveBeenCalled();
  });

  it('debe llamar al método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(id, state, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar el response del evento', async () => {
    //Arrange
    service.changeStateSeller = jest.fn().mockResolvedValue(entity);
    //Act
    await helper(id, state, event, service);

    //Assert
    expect(event.response).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
