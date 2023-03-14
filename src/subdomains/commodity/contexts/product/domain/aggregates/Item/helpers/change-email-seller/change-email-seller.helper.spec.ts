import { SellerDomainEntity } from '@context/product/domain/entities';
import { ChangedEmailSellerEventPublisher } from '@context/product/domain/events';
import { ISellerDomainService } from '@context/product/domain/services';
import { ChangeEmailSellerHelper } from './change-email-seller.helper';
import { v4 as uuidv4 } from 'uuid';
import { AggregateRootException } from '@sofka';

describe('changeEmailSeller', () => {
  let service: ISellerDomainService;
  let event: ChangedEmailSellerEventPublisher;
  let entity: SellerDomainEntity;
  let helper: typeof ChangeEmailSellerHelper;
  const id = uuidv4();
  const email = 'julianga362@gmail.com';

  beforeEach(() => {
    // Arrange
    service = {
      changeEmail: jest.fn(),
    } as unknown as ISellerDomainService;
    event = {
      publish: jest.fn(),
      response: new SellerDomainEntity(),
    } as unknown as ChangedEmailSellerEventPublisher;
    entity = new SellerDomainEntity({
      sellerId: uuidv4(),
      name: 'Julian Garcia',
      email: 'example@gmail.com',
      state: true,
    });
    // Act
    helper = ChangeEmailSellerHelper;
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
    const result = () => helper(id, email, event, service);

    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as ChangedEmailSellerEventPublisher;
    const expected =
      'El evento publicador de cambio de email de vendedor no existe';

    //Act
    const result = () => helper(id, email, event, service);

    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un objeto de tipo SellerDomainEntity', async () => {
    //Arrange
    const expected = new SellerDomainEntity();

    //Act
    const result = await helper(id, email, event, service);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('debe llamar service.changeEmail', async () => {
    //Act
    await helper(id, email, event, service);

    //Assert
    expect(service.changeEmailSeller).toBeCalledWith(id, email);
  });

  it('debe llamar event.publish', async () => {
    //Act
    await helper(id, email, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar event.response', async () => {
    //Act
    await helper(id, email, event, service);

    //Assert
    expect(event.response).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
