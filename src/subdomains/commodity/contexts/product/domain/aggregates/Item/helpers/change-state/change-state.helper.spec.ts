import { ItemDomainEntity } from '@context/product/domain/entities';
import { IItemDomainService } from '@context/product/domain/services';
import { ChangeStateHelper } from './change-state.helper';
import { ChangedStateEventPublisher } from '@context/product/domain/events';
import { v4 as uuidv4 } from 'uuid';
import { AggregateRootException } from '../../../../../../../../../shared/sofka/exceptions/aggregate-root.exception';
describe('changeState', () => {
  let service: IItemDomainService;
  let event: ChangedStateEventPublisher;
  let entity: ItemDomainEntity;
  let helper: typeof ChangeStateHelper;
  const id = uuidv4();
  const state = true;

  beforeEach(() => {
    // Arrange
    service = {
      changeState: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
      response: new ItemDomainEntity(),
    } as unknown as ChangedStateEventPublisher;
    entity = new ItemDomainEntity({
      itemId: uuidv4(),
      name: 'Item',
      description: 'Item description',
      state: true,
    });
    // Act
    helper = ChangeStateHelper;
  });

  it(' debe estar definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un error si no se envía el servicio', () => {
    //Arrange
    service = undefined as unknown as IItemDomainService;
    const expected = 'El servicio de Item no existe';

    //Act
    const result = helper(id, state, event, service);

    //Assert
    expect(result).rejects.toThrow(AggregateRootException);
    expect(result).rejects.toThrow(expected);
  });

  it('debe lanzar un error si no se envía el evento', () => {
    //Arrange
    event = undefined as unknown as ChangedStateEventPublisher;
    const expected =
      'El evento publicador de cambio de estado de producto no existe';

    //Act
    const result = helper(id, state, event, service);

    //Assert
    expect(result).rejects.toThrow(AggregateRootException);
    expect(result).rejects.toThrow(expected);
  });

  it('debe retornar un producto con el estado cambiado', async () => {
    //Arrange
    service.changeState = jest.fn().mockReturnValue(entity);

    //Act
    const result = await helper(id, state, event, service);

    //Assert
    expect(result).toEqual(entity);
  });

  it('debe llamar el método changeState del servicio', async () => {
    //Arrange
    jest.spyOn(service, 'changeState');

    //Act
    await helper(id, state, event, service);

    //Assert
    expect(service.changeState).toHaveBeenCalledWith(id, state);
  });

  it('debe llamar el método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(id, state, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar el response del evento', async () => {
    //Arrange
    service.changeState = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, state, event, service);

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
