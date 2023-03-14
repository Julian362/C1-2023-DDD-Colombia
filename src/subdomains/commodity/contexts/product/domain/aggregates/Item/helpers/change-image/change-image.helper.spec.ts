import { ItemDomainEntity } from '@context/product/domain/entities';
import { ChangedImageEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import { ChangeImageHelper } from './change-image.helper';
import { v4 as uuidv4 } from 'uuid';
import { AggregateRootException } from '@sofka';

describe('changeImage', () => {
  let service: IItemDomainService;
  let event: ChangedImageEventPublisher;
  let entity: ItemDomainEntity;
  let helper: typeof ChangeImageHelper;
  const id = uuidv4();
  const image =
    'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';

  beforeEach(() => {
    // Arrange
    service = {
      changeImage: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
      response: new ItemDomainEntity(),
    } as unknown as ChangedImageEventPublisher;
    entity = new ItemDomainEntity({
      itemId: uuidv4(),
      name: 'Item',
      description: 'Description',
      price: 100,
      state: true,
    });
    // Act
    helper = ChangeImageHelper;
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
    const result = () => helper(id, image, event, service);

    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    //Arrange
    event = undefined as unknown as ChangedImageEventPublisher;
    const expected =
      'El evento publicador de cambio de imagen de producto no existe';

    //Act
    const result = () => helper(id, image, event, service);

    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un ItemDomainEntity si el servicio es definido', async () => {
    //Arrange
    const expected = entity;

    //Act
    const result = await helper(id, image, event, service);

    //Assert
    expect(result).toEqual(expected);
  });

  it('debe llamar service.changeImage', async () => {
    //Act
    await helper(id, image, event, service);

    //Assert
    expect(service.changeImage).toHaveBeenCalledWith(id, image);
  });

  it('debe llamar event.publish', async () => {
    //Act
    await helper(id, image, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe llamar event.response', async () => {
    //Act
    await helper(id, image, event, service);

    //Assert
    expect(event.response).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
