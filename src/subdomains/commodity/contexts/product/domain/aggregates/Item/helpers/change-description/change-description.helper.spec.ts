import { ChangeDescriptionHelper } from './change-description.helper';
import { ChangedDescriptionCategoryEventPublisher } from '@context/product/domain/events';
import { IItemDomainService } from '@context/product/domain/services';
import {
  CategoryDomainEntity,
  ItemDomainEntity,
} from '@context/product/domain/entities';
import { v4 as uuidv4 } from 'uuid';
import { AggregateRootException } from '@sofka';

describe('changeDescription', () => {
  let service: IItemDomainService;
  let event: ChangedDescriptionCategoryEventPublisher;
  let entity: ItemDomainEntity;
  let helper: typeof ChangeDescriptionHelper;
  const id = uuidv4();
  const description = 'Nueva descripción';

  beforeEach(() => {
    // Arrange
    service = {
      changeDescription: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
      response: new CategoryDomainEntity(),
    } as unknown as ChangedDescriptionCategoryEventPublisher;
    entity = new ItemDomainEntity({
      itemId: '9b03ec2e-3d7c-40f2-bd94-38f9ad901376',
      name: 'Ejemplo de producto',
      description: 'Este es un ejemplo de descripción de un producto',
      price: 99,
      image: 'https://ejemplo.com/imagen.png',
      state: true,
      seller: {
        sellerId: 'abc123',
        email: 'ejemplo@ejemplo.com',
        name: 'Juan',
        state: true,
      },
      categories: [
        {
          categoryId: 'cat1',
          name: 'Categoría 1',
          state: true,
          description: 'Descripción de la categoría 1',
        },
        {
          categoryId: 'cat2',
          name: 'Categoría 2',
          state: true,
          description: 'Descripción de la categoría 2',
        },
      ],
    });

    // Act
    helper = ChangeDescriptionHelper;
  });

  it('debe ser definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no es definido', async () => {
    // Arrange
    service = undefined as unknown as IItemDomainService;
    const expected = 'El servicio de item no existe';

    //Act
    const result = () => helper(id, description, event, service);

    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento no es definido', async () => {
    // Arrange
    event = undefined as unknown as ChangedDescriptionCategoryEventPublisher;
    const expected = 'El evento publicador de cambio de descripción no existe';

    //Act
    const result = () => helper(id, description, event, service);

    // Assert
    await expect(result).rejects.toThrow(AggregateRootException);
    await expect(result).rejects.toThrow(expected);
  });

  it('debe retornar la entidad', async () => {
    // Arrange
    service.changeDescription = jest.fn().mockReturnValue(entity);
    const expected = entity;

    //Act
    const result = await helper(id, description, event, service);

    // Assert
    expect(result).toEqual(expected);
  });

  it('debe  llamar a service.changeDescription', async () => {
    // Arrange

    jest.spyOn(service, 'changeDescription');

    //Act
    await helper(id, description, event, service);

    // Assert
    expect(service.changeDescription).toHaveBeenCalledWith(id, description);
  });

  it('debe  llamar a event.publish', async () => {
    // Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(id, description, event, service);

    // Assert
    expect(event.publish).toHaveBeenCalled();
  });
  it('debe  llamar a event.response', async () => {
    //Arrange
    service.changeDescription = jest.fn().mockReturnValue(entity);

    //Act
    await helper(id, description, event, service);

    // Assert
    expect(event.response).toEqual(entity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
