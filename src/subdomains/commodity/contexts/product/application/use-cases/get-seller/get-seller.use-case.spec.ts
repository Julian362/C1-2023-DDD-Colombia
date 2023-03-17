import { ValueObjectException } from '@sofka';
import {
  GotSellerEventPublisher,
  IGetSellerCommand,
  SellerDomainEntity,
  IGotITemResponse,
  ISellerDomainService,
  ItemAggregateRoot,
  IGotSellerResponse,
} from '../../..';
import { GetSellerUseCase } from '../get-seller';

describe('GetSellerUseCase', () => {
  let useCase: GetSellerUseCase;
  let SellerService: ISellerDomainService;
  let itemMock: ItemAggregateRoot;
  let event: GotSellerEventPublisher;

  beforeEach(() => {
    SellerService = {
      getSeller: jest.fn().mockReturnValue({
        sellerId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
      }),
    } as unknown as ISellerDomainService;
    event = {
      publish: jest.fn(),
    } as unknown as GotSellerEventPublisher;
    useCase = new GetSellerUseCase(SellerService, event);
    itemMock = {
      getSeller: jest.fn().mockResolvedValue({
        sellerId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
      }),
    } as unknown as ItemAggregateRoot;
    useCase = new GetSellerUseCase(SellerService, event);
  });

  it('puede obtener una vendedor', async () => {
    //Arrange
    const command: IGetSellerCommand = {
      sellerId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
    };
    const seller = new SellerDomainEntity();
    //Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(false);
    Object.defineProperty(useCase, 'itemAggregateRoot', {
      value: itemMock,
    });
    const response: IGotSellerResponse = await useCase.execute(command);

    //Assert
    expect(response.seller).toEqual(command);
  });
  it('no puede obtener una vendedor', async () => {
    //Arrange
    const command: IGetSellerCommand = {
      sellerId: 'e2702067-c9d7-4283-9ebe-128ebe8d2a6b',
    };
    //Act
    jest.spyOn(useCase, 'hasErrors').mockReturnValue(true);
    Object.defineProperty(useCase, 'sellerAggregateRoot', {
      value: itemMock,
    });

    //Assert
    const result = () => useCase.execute(command);
    expect(result).rejects.toThrow(ValueObjectException);
  });
});
