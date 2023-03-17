import { SellerDomainEntity } from '@context/product/domain/entities';
import { ChangedNameSellerEventPublisher } from '@context/product/domain/events';
import { ISellerDomainService } from '@context/product/domain/services';
import { ChangeNameSellerHelper } from './change-name-seller.helper';
import { v4 as uuidv4 } from 'uuid';
import { AggregateRootException } from '../../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';

describe('changeNameSeller', () => {
  let service: ISellerDomainService;
  let event: ChangedNameSellerEventPublisher;
  let entity: SellerDomainEntity;
  let helper: typeof ChangeNameSellerHelper;
  const id = uuidv4();
  const name = 'Julian Garcia';

  beforeEach(() => {
    // Arrange
    service = {
      changeNameSeller: jest.fn(),
    } as unknown as ISellerDomainService;
    event = {
      publish: jest.fn(),
      response: new SellerDomainEntity(),
    } as unknown as ChangedNameSellerEventPublisher;
    entity = new SellerDomainEntity({
      sellerId: uuidv4(),
      name: 'Julian Garcia',
      email: 'example@gmail.com',
      state: true,
    });
    // Act
    helper = ChangeNameSellerHelper;
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
    const result = () => helper(id, name, event, service);

    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as ChangedNameSellerEventPublisher;
    const expected =
      'El evento publicador de cambio de nombre de vendedor no existe';

    //Act
    const result = () => helper(id, name, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un objeto de tipo SellerDomainEntity', async () => {
    //Arrange
    service.changeNameSeller = jest
      .fn()
      .mockReturnValue(new SellerDomainEntity());
    const expected = new SellerDomainEntity();

    //Act
    const result = await helper(id, name, event, service);

    //Assert
    expect(result).toEqual(expected);
  });
  it('debe llamar al método changeName del servicio', async () => {
    //Act
    await helper(id, name, event, service);

    //Assert
    expect(service.changeNameSeller).toHaveBeenCalledWith(id, name);
  });

  it('debe llamar al método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');
    //Act
    await helper(id, name, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar al response del evento', async () => {
    //Arrange
    service.changeNameSeller = jest.fn().mockReturnValue(entity);
    //Act
    await helper(id, name, event, service);

    //Assert
    expect(event.response).toEqual(entity);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
