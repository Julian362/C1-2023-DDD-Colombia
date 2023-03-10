import {
  CreatedItemEventPublisher,
  DescriptionCategoryValueObject,
  DescriptionValueObject,
  EmailValueObject,
  IItemDomainService,
  ImageValueObject,
  ItemAggregateRoot,
  ItemDomainEntity,
  ItemIdValueObject,
  NameCategoryValueObject,
  NameSellerValueObject,
  NameValueObject,
  PriceValueObject,
  SellerDomainEntity,
  SellerIdValueObject,
  StateCategoryValueObject,
  StateSellerValueObject,
  StateValueObject,
} from '@context/product/domain';
import {
  ValueObjectErrorHandler,
  IUseCase,
  ValueObjectException,
} from 'src/shared/sofka';
import { ICreateItemUserCommand } from '../../../domain/interfaces/commands/create-item.command';
import { ICreatedITemResponse } from '../../../domain/interfaces/responses/created-item.response';
import { CategoryIdValueObject } from '../../../domain/value-objects/category/category-id/category-id.value-object';
/**
 * caso de uso para crear un item
 *
 * @export
 * @class CreateItemUseCase
 * @extends {ValueObjectErrorHandler}
 * @implements {IUseCase<ICreateItemUserCommand, ICreatedITemResponse>}
 */
export class CreateItemUseCase
  extends ValueObjectErrorHandler
  implements IUseCase<ICreateItemUserCommand, ICreatedITemResponse>
{
  private readonly itemAggregateRoot: ItemAggregateRoot;
  /**
   * crea una instancia de CreateItemUseCase
   * @param {IItemDomainService} itemService servicio de dominio de item
   * @param {CreatedItemEventPublisher} createdItemEvenPublisher publicador de eventos de item creado
   * @memberof CreateItemUseCase
   */
  constructor(
    private readonly itemService: IItemDomainService,
    private readonly createdItemEvenPublisher: CreatedItemEventPublisher,
  ) {
    super();
    this.itemAggregateRoot = new ItemAggregateRoot({
      itemService,
      createdItemEP: createdItemEvenPublisher,
    });
  }
  /**
   * ejecuta el caso de uso
   *
   * @param {ICreateItemUserCommand} command comando para crear un item
   * @return {Promise<ICreatedITemResponse>} respuesta de item creado
   * @memberof CreateItemUseCase
   */
  async execute(
    command: ICreateItemUserCommand,
  ): Promise<ICreatedITemResponse> {
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
   * @param {ICreateItemUserCommand} command comando para crear un item
   * @return {(Promise<ItemDomainEntity | null>)} entidad de dominio de item
   * @memberof CreateItemUseCase
   */
  private async executeCommand(
    command: ICreateItemUserCommand,
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
   * @param {ICreateItemUserCommand} command comando para crear un item
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
  private createValueObjects(command: ICreateItemUserCommand): {
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
    const itemId = new ItemIdValueObject(command.id);
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
      categories: valueObject.categories,
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
