import { SellerDomainEntity } from '@context/product/domain/entities';
import { CreatedSellerEventPublisher } from '@context/product/domain/events/publishers/created-seller.event-publisher';
import { ISellerDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';
import { v4 as uuidv4 } from 'uuid';
import { CreateSellerHelper } from './create-seller.helper';

describe('createSeller', () => {
  let service: ISellerDomainService;
  let event: CreatedSellerEventPublisher;
  let entity: SellerDomainEntity;
  let helper: typeof CreateSellerHelper;
  const id = uuidv4();

  beforeEach(() => {
    // Arrange
    service = {
      createSeller: jest.fn(),
    } as unknown as ISellerDomainService;
    event = {
      publish: jest.fn(),
      response: new SellerDomainEntity(),
    } as unknown as CreatedSellerEventPublisher;
    entity = new SellerDomainEntity({
      sellerId: uuidv4(),
      name: 'Seller',
      email: 'julianga362@gmail.com',
    });
    // Act
    helper = CreateSellerHelper;
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
    const result = () => helper(entity, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as CreatedSellerEventPublisher;
    const expected = 'El evento publicador de creación de vendedor no existe';

    //Act
    const result = () => helper(entity, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un seller', async () => {
    //Arrange
    service.createSeller = jest.fn().mockResolvedValue(entity);
    const expected = entity;

    //Act
    const result = await helper(entity, service, event);

    //Assert
    expect(result).toEqual(expected);
  });
  it('debe llamar al método servicio de seller', async () => {
    //Arrange
    service.createSeller = jest.fn().mockResolvedValue(entity);

    //Act
    await helper(entity, service, event);

    //Assert
    expect(service.createSeller).toHaveBeenCalledWith(entity);
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
    service.createSeller = jest.fn().mockResolvedValue(entity);

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
