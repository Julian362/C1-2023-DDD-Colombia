import { EventPublisherBase } from '@sofka';
import {
  ItemDomainEntity,
  CategoryDomainEntity,
  SellerDomainEntity,
} from '../../entities';
import { Publisher } from '../../events';
import { CreateSellerHelper } from './helpers/create-seller/create-seller.helper';
import { CreateCategoryHelper } from './helpers/create-category/create-category.helper';
import { GotCategoryEventPublisher } from '@context/product/domain/events';
import {
  ISellerDomainService,
  IItemDomainService,
  ICategoryDomainService,
} from '../../services';
import {
  ChangeDescriptionCategoryHelper,
  ChangeDescriptionHelper,
  ChangeEmailSellerHelper,
  ChangeImageHelper,
  ChangeNameCategoryHelper,
  ChangeNameHelper,
  ChangeNameSellerHelper,
  ChangeStateCategoryHelper,
  ChangeStateHelper,
  ChangeStateSellerHelper,
  CreateItemHelper,
  DecreasePriceHelper,
  GetCategoryHelper,
  GetItemHelper,
  GetSellerHelper,
  IncreasePriceHelper,
} from './helpers';
import { GetDataOutContextService } from '../../../infrastructure/services/get-data-out-context.service';

/**
 * clase que representa el agregado raíz de item
 *
 * @export
 * @class ItemAggregateRoot
 * @implements {ISellerDomainService} servicio de dominio de vendedor
 * @implements {IItemDomainService} servicio de dominio de item
 * @implements {ICategoryDomainService} servicio de dominio de categoría
 */
export class ItemAggregateRoot
  implements ISellerDomainService, IItemDomainService, ICategoryDomainService
{
  private readonly categoryService?: ICategoryDomainService;
  private readonly sellerService?: ISellerDomainService;
  private readonly itemService?: IItemDomainService;
  private readonly events: Map<Publisher, EventPublisherBase<any>>;
  private readonly getDataOutContextService?: GetDataOutContextService;
  /**
   * crea una instancia de ItemAggregateRoot
   * @param {{
   *     itemService?: IItemDomainService;
   *     sellerService?: ISellerDomainService;
   *     categoryService?: ICategoryDomainService;
   *     events?: Map<Publisher, EventPublisherBase<any>>;
   *   }} {
   *     itemService,
   *     sellerService,
   *     categoryService,
   *     events,
   *   } parámetros de entrada para crear una instancia de ItemAggregateRoot
   * @memberof ItemAggregateRoot
   */
  constructor({
    itemService,
    sellerService,
    categoryService,
    events,
  }: {
    itemService?: IItemDomainService;
    sellerService?: ISellerDomainService;
    categoryService?: ICategoryDomainService;
    events?: Map<Publisher, EventPublisherBase<any>>;
  }) {
    this.itemService = itemService;
    this.sellerService = sellerService;
    this.categoryService = categoryService;
    this.events = events ?? new Map<Publisher, EventPublisherBase<any>>();
  }
  /**
   * crea un vendedor
   *
   * @param {SellerDomainEntity} seller vendedor a crear
   * @return {Promise<SellerDomainEntity>} retorna un vendedor
   * @memberof ItemAggregateRoot
   */
  createSeller(seller: SellerDomainEntity): Promise<SellerDomainEntity> {
    return CreateSellerHelper(
      seller,
      this.sellerService,
      this.events.get(Publisher.CreatedSeller),
    );
  }
  /**
   * crea un item
   *
   * @param {CategoryDomainEntity} category categoría del item
   * @return {Promise<CategoryDomainEntity>}
   * @memberof ItemAggregateRoot
   */
  createCategory(
    category: CategoryDomainEntity,
  ): Promise<CategoryDomainEntity> {
    return CreateCategoryHelper(
      category,
      this.categoryService,
      this.events.get(Publisher.CreatedCategory),
    );
  }
  /**
   * obtiene un vendedor
   *
   * @param {string} sellerId id del vendedor
   * @return {Promise<SellerDomainEntity>} retorna un vendedor
   * @memberof ItemAggregateRoot
   */
  getSeller(sellerId: string): Promise<SellerDomainEntity> {
    return GetSellerHelper(
      sellerId,
      this.sellerService,
      this.events.get(Publisher.GotSeller),
    );
  }
  /**
   * cambia el nombre del item
   *
   * @param {string} itemId id del item
   * @param {string} name nombre del item
   * @return {Promise<ItemDomainEntity>} retorna un item
   * @memberof ItemAggregateRoot
   */
  changeName(itemId: string, name: string): Promise<ItemDomainEntity> {
    return ChangeNameHelper(
      itemId,
      name,
      this.itemService,
      this.events.get(Publisher.ChangedName),
    );
  }
  /**
   * crea un item
   *
   * @param {ItemDomainEntity} item item a crear
   * @return {Promise<ItemDomainEntity>} retorna un vendedor
   * @memberof ItemAggregateRoot
   */
  createItem(item: ItemDomainEntity): Promise<ItemDomainEntity> {
    return CreateItemHelper(
      item,
      this.itemService,
      this.events.get(Publisher.CreatedItem),
    );
  }
  /**
   * obtiene un item
   *
   * @param {string} categoryId id de la categoría
   * @return {Promise<CategoryDomainEntity>} retorna una categoría
   * @memberof ItemAggregateRoot
   */
  getCategory(categoryId: string): Promise<CategoryDomainEntity> {
    return GetCategoryHelper(
      categoryId,
      this.categoryService,
      this.events.get(Publisher.GotCategory),
    );
  }
  /**
   * cambia el nombre de la categoría del vendedor
   *
   * @param {string} categoryId id de la categoría
   * @param {string} name nombre de la categoría
   * @return {Promise<CategoryDomainEntity>} retorna una categoría
   * @memberof ItemAggregateRoot
   */
  changeNameCategory(
    categoryId: string,
    name: string,
  ): Promise<CategoryDomainEntity> {
    return ChangeNameCategoryHelper(
      categoryId,
      name,
      this.events.get(Publisher.ChangeNameCategory),
      this.categoryService,
    );
  }
  /**
   * cambia la descripción de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {string} description descripción de la categoría
   * @return {Promise<CategoryDomainEntity>} retorna una categoría
   * @memberof ItemAggregateRoot
   */
  changeDescriptionCategory(
    categoryId: string,
    description: string,
  ): Promise<CategoryDomainEntity> {
    return ChangeDescriptionCategoryHelper(
      categoryId,
      description,
      this.events.get(Publisher.ChangedDescriptionCategory),
      this.categoryService,
    );
  }
  /**
   * cambia el estado de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {boolean} state estado de la categoría
   * @return {Promise<CategoryDomainEntity>} retorna una categoría
   * @memberof ItemAggregateRoot
   */
  changeStateCategory(
    categoryId: string,
    state: boolean,
  ): Promise<CategoryDomainEntity> {
    return ChangeStateCategoryHelper(
      categoryId,
      state,
      this.events.get(Publisher.ChangedStateCategory),
      this.categoryService,
    );
  }
  /**
   * obtiene un item
   *
   * @param {string} itemId id del item
   * @return {Promise<ItemDomainEntity>} retorna un item
   * @memberof ItemAggregateRoot
   */
  getItem(itemId: string): Promise<ItemDomainEntity> {
    return GetItemHelper(
      itemId,
      this.itemService,
      this.events.get(Publisher.GotItem),
    );
  }
  /**
   * cambia la descripción del item
   *
   * @param {string} itemId id del item
   * @param {string} description descripción del item
   * @return {Promise<ItemDomainEntity>} retorna un item
   * @memberof ItemAggregateRoot
   */
  changeDescription(
    itemId: string,
    description: string,
  ): Promise<ItemDomainEntity> {
    return ChangeDescriptionHelper(
      itemId,
      description,
      this.events.get(Publisher.ChangedDescription),
      this.itemService,
    );
  }
  /**
   * cambia el estado del item
   *
   * @param {string} itemId id del item
   * @param {boolean} state estado del item
   * @return {Promise<ItemDomainEntity>} retorna un item
   * @memberof ItemAggregateRoot
   */
  changeState(itemId: string, state: boolean): Promise<ItemDomainEntity> {
    return ChangeStateHelper(
      itemId,
      state,
      this.events.get(Publisher.ChangedState),
      this.itemService,
    );
  }
  /**
   * cambia la imagen del item
   *
   * @param {string} itemId id del item
   * @param {string} image imagen del item
   * @return {Promise<ItemDomainEntity>} retorna un item
   * @memberof ItemAggregateRoot
   */
  changeImage(itemId: string, image: string): Promise<ItemDomainEntity> {
    return ChangeImageHelper(
      itemId,
      image,
      this.events.get(Publisher.changedImage),
      this.itemService,
    );
  }
  /**
   * incrementa el precio del item
   *
   * @param {string} itemId id del item
   * @param {number} price precio del item
   * @return {Promise<ItemDomainEntity>}
   * @memberof ItemAggregateRoot
   */
  increasePrice(itemId: string, price: number): Promise<ItemDomainEntity> {
    return IncreasePriceHelper(
      itemId,
      price,
      this.events.get(Publisher.IncreasePrice),
      this.itemService,
    );
  }
  /**
   * disminuye el precio del item
   *
   * @param {string} itemId id del item
   * @param {number} price precio del item
   * @return {Promise<ItemDomainEntity>} retorna un item
   * @memberof ItemAggregateRoot
   */
  decreasePrice(itemId: string, price: number): Promise<ItemDomainEntity> {
    return DecreasePriceHelper(
      itemId,
      price,
      this.events.get(Publisher.DecreasePrice),
      this.itemService,
    );
  }
  /**
   * cambia el nombre del vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {string} name nombre del vendedor
   * @return {Promise<SellerDomainEntity>} retorna un vendedor
   * @memberof ItemAggregateRoot
   */
  changeNameSeller(
    sellerId: string,
    name: string,
  ): Promise<SellerDomainEntity> {
    return ChangeNameSellerHelper(
      sellerId,
      name,
      this.events.get(Publisher.changedImage),
      this.sellerService,
    );
  }
  /**
   * cambia el estado del vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {boolean} state estado del vendedor
   * @return {Promise<SellerDomainEntity>} retorna un vendedor
   * @memberof ItemAggregateRoot
   */
  changeStateSeller(
    sellerId: string,
    state: boolean,
  ): Promise<SellerDomainEntity> {
    return ChangeStateSellerHelper(
      sellerId,
      state,
      this.events.get(Publisher.ChangedStateSeller),
      this.sellerService,
    );
  }
  /**
   *  cambia el email del vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {string} email email del vendedor a cambiar
   * @return {Promise<SellerDomainEntity>} retorna un vendedor
   * @memberof ItemAggregateRoot
   */
  changeEmailSeller(
    sellerId: string,
    email: string,
  ): Promise<SellerDomainEntity> {
    return ChangeEmailSellerHelper(
      sellerId,
      email,
      this.events.get(Publisher.ChangedEmail),
      this.sellerService,
    );
  }
}
