import { ItemAggregateRoot } from '@context/product/domain/aggregates';
import { CreatedItemEventPublisher } from '@context/product/domain/events/publishers';
import { ICreateItemCommand } from '@context/product/domain/interfaces';
import { ICreatedITemResponse } from '@context/product/domain/interfaces/responses';
import { IItemDomainService } from '@context/product/domain/services';
import {
  CategoryIdValueObject,
  DescriptionCategoryValueObject,
  DescriptionValueObject,
  EmailValueObject,
  ImageValueObject,
  ItemIdValueObject,
  NameCategoryValueObject,
  NameSellerValueObject,
  NameValueObject,
  PriceValueObject,
  SellerIdValueObject,
  StateCategoryValueObject,
  StateSellerValueObject,
  StateValueObject,
} from '@context/product/domain/value-objects';
import {
  ValueObjectErrorHandler,
  IUseCase,
  ValueObjectException,
  EventPublisherBase,
} from '@sofka';
import {
  CategoryDomainEntity,
  ItemDomainEntity,
  SellerDomainEntity,
} from '../../..';
import { Publisher } from '../../../domain/events/publishers/enums/publisher.enum';
/**
 * caso de uso para crear un item
 *
 * @export
 * @class CreateItemUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<ICreateItemCommand, ICreatedITemResponse>}
 */
export class CreateItemUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<ICreateItemCommand, ICreatedITemResponse>
{
  private readonly itemAggregateRoot: ItemAggregateRoot;
  /**
   * crea una instancia de CreateItemUseCase
   * @param {IItemDomainService} itemService servicio de dominio de item
   * @param {CreatedItemEventPublisher} createdItemEventPublisher publicador de eventos de item creado
   * @memberof CreateItemUseCase
   */
  constructor(
    private readonly itemService: IItemDomainService,
    private readonly createdItemEventPublisher: CreatedItemEventPublisher,
  ) {
    super();
    const events = new Map<Publisher, EventPublisherBase<any>>();
    events.set(Publisher.CreatedItem, this.createdItemEventPublisher);
    this.itemAggregateRoot = new ItemAggregateRoot({
      itemService,
      events,
    });
  }
  /**
   * ejecuta el caso de uso
   *
   * @param {ICreateItemCommand} command comando para crear un item
   * @return {Promise<ICreatedITemResponse>} respuesta de item creado
   * @memberof CreateItemUseCase
   */
  async execute(command: ICreateItemCommand): Promise<ICreatedITemResponse> {
    const item = await this.executeCommand(command);
    return {
      success: item ? true : false,
      item: item,
    };
  }

  /**
   * ejecuta el agregado de item
   *
   * @private
   * @param {ICreateItemCommand} command comando para crear un item
   * @return {(Promise<ItemDomainEntity | null>)} entidad de dominio de item
   * @memberof CreateItemUseCase
   */
  private async executeCommand(
    command: ICreateItemCommand,
  ): Promise<ItemDomainEntity | null> {
    const valueObjects = this.createValueObjects(command);
    this.ValidateValueObjects(valueObjects);
    const item = this.createItemDomainEntity(valueObjects);
    return await this.executeItemAggregateRoot(item);
  }

  /**
   * ejecuta el agregado de item
   *
   * @private
   * @param {ICreateItemCommand} command comando para crear un item
   * @return {{
   *     itemId: ItemIdValueObject;
   *     name: NameValueObject;
   *     description: DescriptionValueObject;
   *     image: ImageValueObject;
   *     price: PriceValueObject;
   *     state: StateValueObject;
   *     seller: {
   *       sellerId: SellerIdValueObject;
   *       nameSeller: NameSellerValueObject;
   *       emailSeller: EmailValueObject;
   *       stateSeller: StateSellerValueObject;
   *     };
   *     categories: {
   *       categoryId: CategoryIdValueObject;
   *       name: NameCategoryValueObject;
   *       state: StateCategoryValueObject;
   *       description: DescriptionCategoryValueObject;
   *     }[];
   *   }} retorna los value objects
   * @memberof CreateItemUseCase
   */
  private createValueObjects(command: ICreateItemCommand): {
    itemId: ItemIdValueObject;
    name: NameValueObject;
    description: DescriptionValueObject;
    image: ImageValueObject;
    price: PriceValueObject;
    state: StateValueObject;
    seller: {
      sellerId: SellerIdValueObject;
      nameSeller: NameSellerValueObject;
      emailSeller: EmailValueObject;
      stateSeller: StateSellerValueObject;
    };
    categories: {
      categoryId: CategoryIdValueObject;
      name: NameCategoryValueObject;
      state: StateCategoryValueObject;
      description: DescriptionCategoryValueObject;
    }[];
  } {
    const itemId = new ItemIdValueObject(command.itemId);
    const name = new NameValueObject(command.name);
    const description = new DescriptionValueObject(command.description);
    const image = new ImageValueObject(command.image);
    const price = new PriceValueObject(command.price);
    const state = new StateValueObject(command.state);

    const sellerId = new SellerIdValueObject(command.seller.sellerId);
    const nameSeller = new NameSellerValueObject(command.seller.name);
    const emailSeller = new EmailValueObject(command.seller.email);
    const stateSeller = new StateSellerValueObject(command.seller.state);

    const categories: {
      categoryId: CategoryIdValueObject;
      name: NameCategoryValueObject;
      state: StateCategoryValueObject;
      description: DescriptionCategoryValueObject;
    }[] = [];

    command.categories.forEach((category) => {
      categories.push({
        categoryId: new CategoryIdValueObject(category.categoryId),
        name: new NameCategoryValueObject(category.name),
        state: new StateCategoryValueObject(category.state),
        description: new DescriptionCategoryValueObject(category.description),
      });
    });

    return {
      itemId,
      name,
      description,
      image,
      price,
      state,
      seller: {
        sellerId,
        nameSeller,
        emailSeller,
        stateSeller,
      },
      categories,
    };
  }

  /**
   *
   *
   * @private
   * @param {{
   *     itemId: ItemIdValueObject;
   *     name: NameValueObject;
   *     description: DescriptionValueObject;
   *     image: ImageValueObject;
   *     price: PriceValueObject;
   *     state: StateValueObject;
   *     seller: {
   *       sellerId: SellerIdValueObject;
   *       nameSeller: NameSellerValueObject;
   *       emailSeller: EmailValueObject;
   *       stateSeller: StateSellerValueObject;
   *     };
   *     categories: {
   *       categoryId: CategoryIdValueObject;
   *       name: NameCategoryValueObject;
   *       state: StateCategoryValueObject;
   *       description: DescriptionCategoryValueObject;
   *     }[];
   *   }} valueObject value objects de item
   * @memberof CreateItemUseCase
   */
  private ValidateValueObjects(valueObject: {
    itemId: ItemIdValueObject;
    name: NameValueObject;
    description: DescriptionValueObject;
    image: ImageValueObject;
    price: PriceValueObject;
    state: StateValueObject;
    seller: {
      sellerId: SellerIdValueObject;
      nameSeller: NameSellerValueObject;
      emailSeller: EmailValueObject;
      stateSeller: StateSellerValueObject;
    };
    categories: {
      categoryId: CategoryIdValueObject;
      name: NameCategoryValueObject;
      state: StateCategoryValueObject;
      description: DescriptionCategoryValueObject;
    }[];
  }) {
    valueObject.categories.forEach((category) => {
      if (category.categoryId.hasErrors())
        this.setErrors(category.categoryId.getErrors());
      if (category.name.hasErrors()) this.setErrors(category.name.getErrors());
      if (category.state.hasErrors())
        this.setErrors(category.state.getErrors());
      if (category.description.hasErrors())
        this.setErrors(category.description.getErrors());
    });

    if (valueObject.itemId.hasErrors())
      this.setErrors(valueObject.itemId.getErrors());
    if (valueObject.name.hasErrors())
      this.setErrors(valueObject.name.getErrors());
    if (valueObject.description.hasErrors())
      this.setErrors(valueObject.description.getErrors());
    if (valueObject.image.hasErrors())
      this.setErrors(valueObject.image.getErrors());
    if (valueObject.price.hasErrors())
      this.setErrors(valueObject.price.getErrors());
    if (valueObject.state.hasErrors())
      this.setErrors(valueObject.state.getErrors());
    if (valueObject.seller.sellerId.hasErrors())
      this.setErrors(valueObject.seller.sellerId.getErrors());
    if (valueObject.seller.nameSeller.hasErrors())
      this.setErrors(valueObject.seller.nameSeller.getErrors());
    if (valueObject.seller.emailSeller.hasErrors())
      this.setErrors(valueObject.seller.emailSeller.getErrors());
    if (valueObject.seller.stateSeller.hasErrors())
      this.setErrors(valueObject.seller.stateSeller.getErrors());
    if (this.hasErrors()) {
      throw new ValueObjectException(
        'hay algunos errores en el comando que se recibe',
        this.getErrors(),
      );
    }
  }

  /**
   * Crea un item con los datos que se reciben
   *
   * @private
   * @param {{
   *     itemId: ItemIdValueObject;
   *     name: NameValueObject;
   *     description: DescriptionValueObject;
   *     image: ImageValueObject;
   *     price: PriceValueObject;
   *     state: StateValueObject;
   *     seller: {
   *       sellerId: SellerIdValueObject;
   *       nameSeller: NameSellerValueObject;
   *       emailSeller: EmailValueObject;
   *       stateSeller: StateSellerValueObject;
   *     };
   *     categories: {
   *       categoryId: CategoryIdValueObject;
   *       name: NameCategoryValueObject;
   *       state: StateCategoryValueObject;
   *       description: DescriptionCategoryValueObject;
   *     }[];
   *   }} valueObject
   * @return {ItemDomainEntity} retorna un item
   * @memberof CreateItemUseCase
   */
  private createItemDomainEntity(valueObject: {
    itemId: ItemIdValueObject;
    name: NameValueObject;
    description: DescriptionValueObject;
    image: ImageValueObject;
    price: PriceValueObject;
    state: StateValueObject;
    seller: {
      sellerId: SellerIdValueObject;
      nameSeller: NameSellerValueObject;
      emailSeller: EmailValueObject;
      stateSeller: StateSellerValueObject;
    };
    categories: {
      categoryId: CategoryIdValueObject;
      name: NameCategoryValueObject;
      state: StateCategoryValueObject;
      description: DescriptionCategoryValueObject;
    }[];
  }) {
    const categoriesMapped = valueObject.categories.map((category) => {
      return new CategoryDomainEntity({
        categoryId: category.categoryId.valueOf(),
        name: category.name.valueOf(),
        state: category.state.valueOf(),
        description: category.description.valueOf(),
      });
    });
    return new ItemDomainEntity({
      itemId: valueObject.itemId.valueOf(),
      name: valueObject.name.valueOf(),
      description: valueObject.description.valueOf(),
      image: valueObject.image.valueOf(),
      price: valueObject.price.valueOf(),
      state: valueObject.state.valueOf(),
      seller: new SellerDomainEntity({
        sellerId: valueObject.seller.sellerId.valueOf(),
        name: valueObject.seller.nameSeller.valueOf(),
        email: valueObject.seller.emailSeller.valueOf(),
        state: valueObject.seller.stateSeller.valueOf(),
      }),
      categories: categoriesMapped,
    });
  }

  /**
   * Ejecuta el caso de uso
   *
   * @private
   * @param {ItemDomainEntity} item item a crear
   * @return {Promise<ItemDomainEntity>} retorna una promesa con el item creado
   * @memberof CreateItemUseCase
   */
  private async executeItemAggregateRoot(
    item: ItemDomainEntity,
  ): Promise<ItemDomainEntity> {
    const result = await this.itemAggregateRoot.createItem(item);
    return result;
  }
}
