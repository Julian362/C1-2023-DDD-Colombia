import { CategoryDomainEntity } from '@context/product/domain/entities';
import { ChangedNameCategoryEventPublisher } from '@context/product/domain/events';
import { ICategoryDomainService } from '@context/product/domain/services';
import { ChangeNameCategoryHelper } from './change-name-category.helper';
import { v4 as uuidv4 } from 'uuid';
import { AggregateRootException } from '@sofka';

describe('changeNameCategory', () => {
  let service: ICategoryDomainService;
  let event: ChangedNameCategoryEventPublisher;
  let entity: CategoryDomainEntity;
  let helper: typeof ChangeNameCategoryHelper;
  const id = uuidv4();
  const name = 'Nueva descripción';

  beforeEach(() => {
    // Arrange
    service = {
      changeName: jest.fn(),
    } as unknown as ICategoryDomainService;
    event = {
      publish: jest.fn(),
      response: new CategoryDomainEntity(),
    } as unknown as ChangedNameCategoryEventPublisher;
    entity = new CategoryDomainEntity({
      categoryId: uuidv4(),
      name: 'Categoría 1',
      state: true,
      description: 'Descripción de la categoría 1',
    });

    // Act
    helper = ChangeNameCategoryHelper;
  });

  it('debe ser definido', () => {
    // Assert
    expect(helper).toBeDefined();
  });

  it('debe lanzar un throw AggregateRootException si el servicio no es definido', async () => {
    //Arrange
    service = undefined as unknown as ICategoryDomainService;
    const expected = 'El servicio de categoría no existe';

    //Act
    const result = () => helper(id, name, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe lanzar un throw AggregateRootException si el evento publicador no es definido', async () => {
    //Arrange
    event = undefined as unknown as ChangedNameCategoryEventPublisher;
    const expected =
      'El evento publicador de cambio de nombre de categoría no existe';

    //Act
    const result = () => helper(id, name, event, service);

    //Assert
    await expect(result).rejects.toThrowError(AggregateRootException);
    await expect(result).rejects.toThrowError(expected);
  });

  it('debe retornar un objeto de tipo CategoryDomainEntity', async () => {
    //Arrange
    const expected = new CategoryDomainEntity();

    //Act
    const result = await helper(id, name, event, service);

    //Assert
    expect(result).toEqual(expected);
  });

  it('debe llamar al método changeNameCategory del servicio', async () => {
    //Act
    await helper(id, name, event, service);

    //Assert
    expect(service.changeNameCategory).toHaveBeenCalledWith(id, name);
  });

  it('debe llamar al método publish del evento', async () => {
    //Arrange
    jest.spyOn(event, 'publish');

    //Act
    await helper(id, name, event, service);

    //Assert
    expect(event.publish).toHaveBeenCalled();
  });

  it('debe retornar el objeto response del evento', async () => {
    //Arrange
    const expected = new CategoryDomainEntity();

    //Act
    const result = await helper(id, name, event, service);

    //Assert
    expect(result).toEqual(expected);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
