import { ValueObjectException } from '@sofka';
import {
  IItemDomainService as IItemDomainService,
  ItemAggregateRoot,
  GotItemEventPublisher,
  IGetItemCommand,
  ItemDomainEntity,
  IGotITemResponse,
} from '../../..';
import { GetItemUseCase } from '../get-item';

describe('GetItemUseCase', () => {
  let useCase: GetItemUseCase;
  let ItemService: IItemDomainService;
  let itemMock: ItemAggregateRoot;
  let event: GotItemEventPublisher;

  beforeEach(() => {
    ItemService = {
      getItem: jest.fn().mockReturnValue({
        itemId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
      }),
    } as unknown as IItemDomainService;
    event = {
      publish: jest.fn(),
    } as unknown as GotItemEventPublisher;
    useCase = new GetItemUseCase(ItemService, event);
    itemMock = {
      getItem: jest.fn().mockResolvedValue({
        itemId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
      }),
    } as unknown as ItemAggregateRoot;
    useCase = new GetItemUseCase(ItemService, event);
  });

  it('puede obtener una item', async () => {
    //Arrange
    const command: IGetItemCommand = {
      itemId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
    };
    const item = new ItemDomainEntity();
    //Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'itemAggregateRoot', { value: itemMock });
    const response: IGotITemResponse = await useCase.execute(command);

    //Assert
    expect(response.item).toEqual(command);
  });
  it('no puede obtener una item', async () => {
    //Arrange
    const command: IGetItemCommand = {
      itemId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
    };
    //Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(true);
    Object.defineProperty(useCase, 'itemAggregateRoot', { value: itemMock });

    //Assert
    const result = () => useCase.execute(command);
    expect(result).rejects.toThrow(ValueObjectException);
  });
});
