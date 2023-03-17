import { CreatedItemEventPublisher } from './created-item.event-publisher';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
import { Publisher } from './enums/publisher.enum';
import { GotItemEventPublisher } from './got-item.event-publisher';
import {
  CategoryDomainEntity,
  SellerDomainEntity,
} from '@context/product/domain/entities';
import { CreatedSellerEventPublisher } from '@context/product/domain/events/publishers/created-seller.event-publisher';
import {
  ChangedDescriptionEventPublisher,
  ChangedEmailSellerEventPublisher,
  ChangedNameEventPublisher,
  ChangedNameSellerEventPublisher,
  ChangedStateEventPublisher,
  ChangedStateSellerEventPublisher,
  DecreasePriceEventPublisher,
  IncreasePriceEventPublisher,
} from '@context/product/domain/events';
describe('event publisher', () => {
  describe('item', () => {
    describe('createItemEventPublisher', () => {
      class MockCreateItemEventPublisher extends CreatedItemEventPublisher {}
      let event: CreatedItemEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockCreateItemEventPublisher(publisher);
        event.response = {} as ItemDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.CreatedItem;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangedDescriptionItemEventPublisher', () => {
      class MockChangedDescriptionItemEventPublisher extends ChangedDescriptionEventPublisher {}
      let event: ChangedDescriptionEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangedDescriptionItemEventPublisher(publisher);
        event.response = {} as ItemDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangedDescription;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangedNameItemEventPublisher', () => {
      class MockChangedNameItemEventPublisher extends ChangedNameEventPublisher {}
      let event: ChangedNameEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangedNameItemEventPublisher(publisher);
        event.response = {} as ItemDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangedName;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('IncreaseEvenPublisher', () => {
      class MockIncreaseEvenPublisher extends IncreasePriceEventPublisher {}
      let event: IncreasePriceEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockIncreaseEvenPublisher(publisher);
        event.response = {} as ItemDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.IncreasePrice;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('DecreaseEvenPublisher', () => {
      class MockDecreaseEvenPublisher extends DecreasePriceEventPublisher {}
      let event: DecreasePriceEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockDecreaseEvenPublisher(publisher);
        event.response = {} as ItemDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.DecreasePrice;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangedDescriptionItemEventPublisher', () => {
      class MockChangedDescriptionItemEventPublisher extends ChangedDescriptionEventPublisher {}
      let event: ChangedDescriptionEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangedDescriptionItemEventPublisher(publisher);
        event.response = {} as ItemDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangedDescription;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangeStateItemEventPublisher', () => {
      class MockChangeStateItemEventPublisher extends ChangedStateEventPublisher {}
      let event: ChangedStateEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangeStateItemEventPublisher(publisher);
        event.response = {} as ItemDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangedState;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('GotItemEventPublisher', () => {
      class MockGotItemEventPublisher extends GotItemEventPublisher {}
      let event: GotItemEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockGotItemEventPublisher(publisher);
        event.response = {} as ItemDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.GotItem;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
  });
  describe('category', () => {
    describe('CreateCategoryEventPublisher', () => {
      class MockCreateCategoryEventPublisher extends CreatedItemEventPublisher {}
      let event: CreatedItemEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockCreateCategoryEventPublisher(publisher);
        event.response = {} as CategoryDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.CreatedItem;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangedNameCategoryEventPublisher', () => {
      class MockChangedNameCategoryEventPublisher extends ChangedNameEventPublisher {}
      let event: ChangedNameEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangedNameCategoryEventPublisher(publisher);
        event.response = {} as CategoryDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangedName;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangedDescriptionCategoryEventPublisher', () => {
      class MockChangedDescriptionCategoryEventPublisher extends ChangedDescriptionEventPublisher {}
      let event: ChangedDescriptionEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangedDescriptionCategoryEventPublisher(publisher);
        event.response = {} as CategoryDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangedDescription;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangedStateCategoryEventPublisher', () => {
      class MockChangedStateCategoryEventPublisher extends ChangedStateEventPublisher {}
      let event: ChangedStateEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangedStateCategoryEventPublisher(publisher);
        event.response = {} as CategoryDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangedState;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
  });
  describe('seller', () => {
    describe('CreateSellerEventPublisher', () => {
      class MockCreateSellerEventPublisher extends CreatedSellerEventPublisher {}
      let event: CreatedSellerEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockCreateSellerEventPublisher(publisher);
        event.response = {} as SellerDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.CreatedSeller;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangedNameSellerEventPublisher', () => {
      class MockChangedNameSellerEventPublisher extends ChangedNameSellerEventPublisher {}
      let event: ChangedNameSellerEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangedNameSellerEventPublisher(publisher);
        event.response = {} as SellerDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangeNameSeller;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangedStateSellerEventPublisher', () => {
      class MockChangedStateSellerEventPublisher extends ChangedStateSellerEventPublisher {}
      let event: ChangedStateSellerEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangedStateSellerEventPublisher(publisher);
        event.response = {} as SellerDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangedStateSeller;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
    describe('ChangedEmailSellerEventPublisher', () => {
      class MockChangedEmailSellerEventPublisher extends ChangedEmailSellerEventPublisher {}
      let event: ChangedEmailSellerEventPublisher;
      let publisher: {
        emit: jest.Mock;
        send: jest.Mock;
      };
      beforeEach(() => {
        //Arrange
        publisher = {
          emit: jest.fn(),
          send: jest.fn(),
        };
        event = new MockChangedEmailSellerEventPublisher(publisher);
        event.response = {} as SellerDomainEntity;
      });

      describe('publish', () => {
        it('debe ser definido', () => {
          // Act
          expect(event).toBeDefined();
        });

        it('debe llamar al emit del publisher con response', async () => {
          //Arrange
          const expectedEvent = Publisher.ChangedEmail;
          const expectedResponse = JSON.stringify(event.response);
          publisher.emit.mockResolvedValue('success');

          //Act
          const result = await event.publish();

          //Assert
          expect(publisher.emit).toBeCalledWith(
            expectedEvent,
            expectedResponse,
          );
          expect(result).toEqual('success');
        });
      });
    });
  });
});
