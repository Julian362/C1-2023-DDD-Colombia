import { SellerDomainEntity } from '@context/product/domain/entities';
import { ISellerDomainService } from '@context/product/domain/services';
import { GetSellerHelper } from './get-seller-helper';
import { v4 as uuidv4 } from 'uuid';
import { GotSellerEventPublisher } from '@context/product/domain/events';
import { AggregateRootException } from '../../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
describe('getSeller', () => {
  let service: ISellerDomainService;
  let event: GotSellerEventPublisher;
  let entity: SellerDomainEntity;
  let helper: typeof GetSellerHelper;
  const id = uuidv4();

  beforeEach(() => {
    // Arrange
    service = {
      getSeller: jest.fn(),
    } as unknown as ISellerDomainService;
    event = {
      publish: jest.fn(),
      response: new SellerDomainEntity(),
    } as unknown as GotSellerEventPublisher;
    entity = new SellerDomainEntity({
      sellerId: uuidv4(),
      name: 'Julian Garcia',
      email: 'julianga362@gmail.com',
      state: true,
    });
    // Act
    helper = GetSellerHelper;
  });

  it('debe ser definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no es definido', async () => {
    //Arrange
    service = undefined as unknown as ISellerDomainService;
    const expected = 'El servicio de vendedor no existe';

    //Act
    const result = () => helper(id, service, event);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as GotSellerEventPublisher;
    const expected = 'El evento publicador obtener vendedor  no existe';

    //Act
    const result = () => helper(id, service, event);

    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un objeto de tipo SellerDomainEntity', async () => {
    //Arrange
    service.getSeller = jest.fn().mockReturnValue(entity);

    //Act
    const result = await helper(id, service, event);

    //Assert
    expect(result).toBeInstanceOf(SellerDomainEntity);
  });

  it('debe llamar al método getSeller del servicio', async () => {
    //Arrange
    service.getSeller = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, service, event);

    //Assert
    expect(service.getSeller).toHaveBeenCalledTimes(1);
  });

  it('debe llamar al método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(id, service, event);

    //Assert
    expect(event.publish).toHaveBeenCalledTimes(1);
  });

  it('debe llamar al response del evento', async () => {
    //Arrange
    service.getSeller = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, service, event);

    //Assert
    expect(event.response).toBeInstanceOf(SellerDomainEntity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
