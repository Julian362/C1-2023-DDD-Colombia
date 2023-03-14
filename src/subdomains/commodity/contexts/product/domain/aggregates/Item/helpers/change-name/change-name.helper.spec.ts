import { ItemDomainEntity } from '@context/product/domain/entities';
import { ChangedNameEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { ChangeNameHelper } from './change-name.helper';
import { v4 as uuidv4 } from 'uuid';
import { AggregateRootException } from '@sofka';

describe('changeName', () => {
  let service: IItemDomainService;
  let event: ChangedNameEventPublisher;
  let entity: ItemDomainEntity;
  let helper: typeof ChangeNameHelper;
  const id = uuidv4();
  const name = 'Item';

  beforeEach(() => {
    // Arrange
    service = {
      changeName: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
      response: new ItemDomainEntity(),
    } as unknown as ChangedNameEventPublisher;
    entity = new ItemDomainEntity({
      itemId: uuidv4(),
      name: 'Item',
      description: 'Description',
      price: 100,
      state: true,
    });
    // Act
    helper = ChangeNameHelper;
  });

  it('debe ser definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no es definido', async () => {
    //Arrange
    service = undefined as unknown as IItemDomainService;
    const expected = 'El servicio de Item no existe';

    //Act
    const result = () => helper(id, name, service, event);

    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as ChangedNameEventPublisher;
    const expected =
      'El evento publicador de cambio de nombre de producto no existe';

    //Act
    const result = () => helper(id, name, service, event);

    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un ItemDomainEntity si el servicio es definido', async () => {
    //Arrange
    service.changeName = jest.fn().mockReturnValue(entity);
    const expected = entity;

    //Act
    const result = await helper(id, name, service, event);

    //Assert
    expect(result).toEqual(expected);
  });

  it('debe llamar al metodo changeName del servicio', async () => {
    //Arrange
    jest.spyOn(service, 'changeName');

    //Act
    await helper(id, name, service, event);

    //Assert
    expect(service.changeName).toHaveBeenCalled();
  });

  it('debe llamar al evento publish', async () => {
    //Arrange
    service.changeName = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, name, service, event);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar al evento response', async () => {
    //Arrange
    service.changeName = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, name, service, event);

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
