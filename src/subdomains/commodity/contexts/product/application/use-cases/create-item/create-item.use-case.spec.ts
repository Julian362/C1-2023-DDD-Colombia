import {
  ICreateItemCommand,
  IItemDomainService,
} from '@context/product/domain/index';
import { CreateItemUseCase } from './create-item.use-case';
import { CreatedItemEventPublisher } from '../../../domain/events/publishers/created-item.event-publisher';
import { ItemAggregateRoot } from '../../../domain/aggregates/Item/Item.aggregate';
import { ICreatedITemResponse } from '@context/product/domain/interfaces/responses';
import { ValueObjectException } from '@sofka';
describe('CreateItemUseCase', () => {
  let useCase: CreateItemUseCase;
  let ItemService: IItemDomainService;
  let event: CreatedItemEventPublisher;
  let itemMock: ItemAggregateRoot;

  beforeEach(() => {
    ItemService = {
      createItem: jest.fn(),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
    } as unknown as CreatedItemEventPublisher;
    useCase = new CreateItemUseCase(ItemService, event);
    itemMock = {
      createItem: jest.fn().mockResolvedValue({
        itemId: 'f17680a3-ec89-4ddd-ae5f-f19b562c0768',
        name: 'Item 1',
        image: './image.png',
        description: 'Item 1 description',
        price: 100,
        state: true,
        seller: {
          sellerId: '8d145225-4064-43ab-bd61-83e14a939d1a',
          name: 'Seller 1',
          email: 'example@gmail.com',
          state: true,
        },
        categories: [
          {
            categoryId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
            name: 'Category 1',
            description: 'Category 1 description',
            state: true,
          },
        ],
      }),
    } as unknown as ItemAggregateRoot;
    useCase = new CreateItemUseCase(ItemService, event);
  });

  it('puede crear un item', async () => {
    //Arrange
    const command: ICreateItemCommand = {
      itemId: 'f17680a3-ec89-4ddd-ae5f-f19b562c0768',
      name: 'Item 1',
      description: 'Item 1 description',
      image: './image.png',
      price: 100,
      state: true,
      seller: {
        sellerId: '8d145225-4064-43ab-bd61-83e14a939d1a',
        name: 'Seller 1',
        email: 'example@gmail.com',
        state: true,
      },
      categories: [
        {
          categoryId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
          name: 'Category 1',
          description: 'Category 1 description',
          state: true,
        },
      ],
    };
    //Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'itemAggregateRoot', { value: itemMock });
    const response: ICreatedITemResponse = await useCase.execute(command);

    //Assert
    expect(response.success).toBeTruthy();
    expect(response.item).toEqual(command);
    expect(itemMock.createItem).toHaveBeenCalledWith(command);
  });

  it('debe lanzar un error si el comando no es valido', async () => {
    //Arrange
    const command = {
      itemId: 'f17680a3-ec89-4ddd-ae5f-',
      name: 'Item 1',
      description: 'Item 1 description',
      image: './image',
      price: -100,
      state: true,
      seller: {
        sellerId: '8d145225-4064-43ab-bd61-',
        name: 'nazi',
        email: 'example.com',
        state: true,
      },
      categories: [
        {
          categoryId: 'e2702067-c9d7-4283-9ebe-',
          name: 'a',
          description: 'nazi',
          state: true,
        },
      ],
    };

    //Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(true);
    Object.defineProperty(useCase, 'itemAggregateRoot', { value: itemMock });

    //Assert
    const result = () => useCase.execute(command);
    expect(result).rejects.toThrow(ValueObjectException);
  });
});
