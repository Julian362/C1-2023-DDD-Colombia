jest.mock('./helpers');

import * as helpers from './helpers';
import { v4 as uuidv4 } from 'uuid';
import {
  IItemDomainService,
  ICategoryDomainService,
  ISellerDomainService,
} from '@context/product/domain/services';
import { ItemAggregateRoot } from './Item.aggregate';
import { Publisher } from '@context/product/domain/events';
import { EventPublisherBase } from '@sofka';
import { CategoryDomainEntity } from '../../entities';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
import { SellerDomainEntity } from '../../entities/seller.domain-entity';

describe('Item', () => {
  let item: ItemAggregateRoot;
  let itemService: IItemDomainService;
  let categoryService: ICategoryDomainService;
  let sellerService: ISellerDomainService;
  let events: Map<Publisher, EventPublisherBase<any>>;

  beforeEach(() => {
    //Arrange - Act
    categoryService = {} as ICategoryDomainService;
    sellerService = {} as ISellerDomainService;
    itemService = {} as IItemDomainService;
    events = new Map<Publisher, EventPublisherBase<any>>();
    item = new ItemAggregateRoot({
      itemService,
      categoryService,
      sellerService,
      events,
    });
  });

  it('debe ser definido', () => {
    //Assert
    expect(item).toBeDefined();
  });

  describe('aggregate root', () => {
    describe('changeDescription', () => {
      it('ejecuta ChangeDescriptionHelper con los parámetros', () => {
        //Arrange
        const entity = new ItemDomainEntity();
        const expected = new ItemDomainEntity();
        const description = 'description';
        const id = uuidv4();
        events.set(
          Publisher.ChangedDescription,
          {} as EventPublisherBase<ItemDomainEntity>,
        );
        jest
          .spyOn(helpers, 'ChangeDescriptionHelper')
          .mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          itemService,
          events,
        });
        const result = item.changeDescription(id, description);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeDescriptionHelper).toHaveBeenCalledWith(
          id,
          description,
          events.get(Publisher.ChangedDescription),
          itemService,
        );
      });
    });
    describe('changeName', () => {
      it('ejecuta ChangeNameHelper con los parámetros', () => {
        //Arrange
        const entity = new ItemDomainEntity();
        const expected = new ItemDomainEntity();
        const name = 'name';
        const id = uuidv4();
        events.set(
          Publisher.ChangedName,
          {} as EventPublisherBase<ItemDomainEntity>,
        );
        jest.spyOn(helpers, 'ChangeNameHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          itemService,
          events,
        });
        const result = item.changeName(id, name);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeNameHelper).toHaveBeenCalledWith(
          id,
          name,
          events.get(Publisher.ChangedName),
          itemService,
        );
      });
    });
    describe('changeImage', () => {
      it('ejecuta ChangeImageHelper con los parámetros', () => {
        //Arrange
        const entity = new ItemDomainEntity();
        const expected = new ItemDomainEntity();
        const image = './image.png';
        const id = uuidv4();
        events.set(
          Publisher.changedImage,
          {} as EventPublisherBase<ItemDomainEntity>,
        );
        jest.spyOn(helpers, 'ChangeImageHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          itemService,
          events,
        });
        const result = item.changeImage(id, image);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeImageHelper).toHaveBeenCalledWith(
          id,
          image,
          events.get(Publisher.changedImage),
          itemService,
        );
      });
    });
    describe('changeState', () => {
      it('ejecuta ChangeStateHelper con los parámetros', () => {
        //Arrange
        const entity = new ItemDomainEntity();
        const expected = new ItemDomainEntity();
        const state = true;
        const id = uuidv4();
        events.set(
          Publisher.ChangedState,
          {} as EventPublisherBase<ItemDomainEntity>,
        );
        jest.spyOn(helpers, 'ChangeStateHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          itemService,
          events,
        });
        const result = item.changeState(id, state);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeStateHelper).toHaveBeenCalledWith(
          id,
          state,
          events.get(Publisher.ChangedState),
          itemService,
        );
      });
    });
    describe('createItem', () => {
      it('ejecuta CreateItemHelper con los parámetros', () => {
        //Arrange
        const entity = new ItemDomainEntity();
        const aggregate = new ItemDomainEntity({
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
        const expected = new ItemDomainEntity();
        events.set(
          Publisher.CreatedItem,
          {} as EventPublisherBase<ItemDomainEntity>,
        );
        jest.spyOn(helpers, 'CreateItemHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          itemService,
          events,
        });
        const result = item.createItem(aggregate);
        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.CreateItemHelper).toHaveBeenCalledWith(
          aggregate,
          itemService,
          events.get(Publisher.CreatedItem),
        );
      });
    });
    describe('getItem', () => {
      it('ejecuta GetItemHelper con los parámetros', () => {
        //Arrange
        const entity = new ItemDomainEntity();
        const expected = new ItemDomainEntity();
        const sellerId = uuidv4();
        events.set(
          Publisher.GotItem,
          {} as EventPublisherBase<ItemDomainEntity>,
        );
        jest.spyOn(helpers, 'GetItemHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          itemService,
          events,
        });
        const result = item.getItem(sellerId);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.GetItemHelper).toHaveBeenCalledWith(
          sellerId,
          events.get(Publisher.GotItem),
          itemService,
        );
      });
    });
    describe('increasePrice', () => {
      it('ejecuta IncreasePriceHelper con los parámetros', () => {
        //Arrange
        const entity = new ItemDomainEntity();
        const expected = new ItemDomainEntity();
        const price = 100;
        const id = uuidv4();
        events.set(
          Publisher.IncreasePrice,
          {} as EventPublisherBase<ItemDomainEntity>,
        );
        jest.spyOn(helpers, 'IncreasePriceHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          itemService,
          events,
        });
        const result = item.increasePrice(id, price);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.IncreasePriceHelper).toHaveBeenCalledWith(
          id,
          price,
          events.get(Publisher.IncreasePrice),
          itemService,
        );
      });
    });
    describe('decreasePrice', () => {
      it('ejecuta DecreasePriceHelper con los parámetros', () => {
        //Arrange
        const entity = new ItemDomainEntity();
        const expected = new ItemDomainEntity();
        const price = 100;
        const id = uuidv4();
        events.set(
          Publisher.DecreasePrice,
          {} as EventPublisherBase<ItemDomainEntity>,
        );
        jest.spyOn(helpers, 'DecreasePriceHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          itemService,
          events,
        });
        const result = item.decreasePrice(id, price);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.DecreasePriceHelper).toHaveBeenCalledWith(
          id,
          price,
          events.get(Publisher.DecreasePrice),
          itemService,
        );
      });
    });
  });

  describe('Category', () => {
    describe('changeDescriptionCategory', () => {
      it('ejecuta ChangeDescriptionCategoryHelper con los parámetros', () => {
        //Arrange
        const entity = new CategoryDomainEntity();
        const expected = new CategoryDomainEntity();
        const description = 'description';
        const id = uuidv4();
        events.set(
          Publisher.ChangedDescriptionCategory,
          {} as EventPublisherBase<CategoryDomainEntity>,
        );
        jest
          .spyOn(helpers, 'ChangeDescriptionCategoryHelper')
          .mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          categoryService,
          events,
        });
        const result = item.changeDescriptionCategory(id, description);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeDescriptionCategoryHelper).toHaveBeenCalledWith(
          id,
          description,
          events.get(Publisher.ChangedDescriptionCategory),
          categoryService,
        );
      });
    });
    describe('changeNameCategory', () => {
      it('ejecuta ChangeNameCategoryHelper con los parámetros', () => {
        //Arrange
        const entity = new CategoryDomainEntity();
        const expected = new CategoryDomainEntity();
        const name = 'name';
        const id = uuidv4();
        events.set(
          Publisher.ChangeNameCategory,
          {} as EventPublisherBase<CategoryDomainEntity>,
        );
        jest
          .spyOn(helpers, 'ChangeNameCategoryHelper')
          .mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          categoryService,
          events,
        });
        const result = item.changeNameCategory(id, name);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeNameCategoryHelper).toHaveBeenCalledWith(
          id,
          name,
          events.get(Publisher.ChangeNameCategory),
          categoryService,
        );
      });
    });
    describe('changeStateCategory', () => {
      it('ejecuta ChangeStateCategoryHelper con los parámetros', () => {
        //Arrange
        const entity = new CategoryDomainEntity();
        const expected = new CategoryDomainEntity();
        const state = true;
        const id = uuidv4();
        events.set(
          Publisher.ChangedStateCategory,
          {} as EventPublisherBase<CategoryDomainEntity>,
        );
        jest
          .spyOn(helpers, 'ChangeStateCategoryHelper')
          .mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          categoryService,
          events,
        });
        const result = item.changeStateCategory(id, state);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeStateCategoryHelper).toHaveBeenCalledWith(
          id,
          state,
          categoryService,
          events.get(Publisher.ChangedStateCategory),
        );
      });
    });
    describe('getCategory', () => {
      it('ejecuta GetCategoryHelper con los parámetros', () => {
        //Arrange
        const entity = new CategoryDomainEntity();
        const expected = new CategoryDomainEntity();
        const id = uuidv4();
        events.set(
          Publisher.GotCategory,
          {} as EventPublisherBase<CategoryDomainEntity>,
        );
        jest.spyOn(helpers, 'GetCategoryHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          categoryService,
          events,
        });
        const result = item.getCategory(id);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.GetCategoryHelper).toHaveBeenCalledWith(
          id,
          events.get(Publisher.GotCategory),
          categoryService,
        );
      });
    });
  });
  describe('Seller', () => {
    describe('changeEmailSeller', () => {
      it('ejecuta ChangeEmailSellerHelper con los parámetros', () => {
        //Arrange
        const entity = new SellerDomainEntity();
        const expected = new SellerDomainEntity();
        const email = 'email@hotmail.com';
        const id = uuidv4();
        events.set(
          Publisher.ChangedEmail,
          {} as EventPublisherBase<SellerDomainEntity>,
        );
        jest
          .spyOn(helpers, 'ChangeEmailSellerHelper')
          .mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          sellerService,
          events,
        });
        const result = item.changeEmailSeller(id, email);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeEmailSellerHelper).toHaveBeenCalledWith(
          id,
          email,
          events.get(Publisher.ChangedEmail),
          sellerService,
        );
      });
    });
    describe('changeNameSeller', () => {
      it('ejecuta ChangeNameSellerHelper con los parámetros', () => {
        //Arrange
        const entity = new SellerDomainEntity();
        const expected = new SellerDomainEntity();
        const name = 'name';
        const id = uuidv4();
        events.set(
          Publisher.ChangeNameSeller,
          {} as EventPublisherBase<SellerDomainEntity>,
        );
        jest.spyOn(helpers, 'ChangeNameSellerHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          sellerService,
          events,
        });
        const result = item.changeNameSeller(id, name);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeNameSellerHelper).toHaveBeenCalledWith(
          id,
          name,
          events.get(Publisher.ChangeNameSeller),
          sellerService,
        );
      });
    });
    describe('changeStateSeller', () => {
      it('ejecuta ChangeStateSellerHelper con los parámetros', () => {
        //Arrange
        const entity = new SellerDomainEntity();
        const expected = new SellerDomainEntity();
        const state = true;
        const id = uuidv4();
        events.set(
          Publisher.ChangedStateSeller,
          {} as EventPublisherBase<SellerDomainEntity>,
        );
        jest
          .spyOn(helpers, 'ChangeStateSellerHelper')
          .mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          sellerService,
          events,
        });
        const result = item.changeStateSeller(id, state);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.ChangeStateSellerHelper).toHaveBeenCalledWith(
          id,
          state,
          events.get(Publisher.ChangedStateSeller),
          sellerService,
        );
      });
    });
    describe('getSeller', () => {
      it('ejecuta GetSellerHelper con los parámetros', () => {
        //Arrange
        const entity = new SellerDomainEntity();
        const expected = new SellerDomainEntity();
        const id = uuidv4();
        events.set(
          Publisher.GotSeller,
          {} as EventPublisherBase<SellerDomainEntity>,
        );
        jest.spyOn(helpers, 'GetSellerHelper').mockResolvedValue(entity);

        //Act
        item = new ItemAggregateRoot({
          sellerService,
          events,
        });
        const result = item.getSeller(id);

        //Assert
        expect(result).resolves.toEqual(expected);
        expect(helpers.GetSellerHelper).toHaveBeenCalledWith(
          id,
          sellerService,
          events.get(Publisher.GotSeller),
        );
      });
    });
  });
});
