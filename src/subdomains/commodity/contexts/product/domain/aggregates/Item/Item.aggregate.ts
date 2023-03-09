import {
  ItemDomainEntity,
  CategoryDomainEntity,
  SellerDomainEntity,
} from '../../entities';
import {
  ChangedDescriptionCategoryEventPublisher,
  ChangedDescriptionEventPublisher,
  ChangedEmailSellerEventPublisher,
  ChangedImageEventPublisher,
  ChangedNameCategoryEventPublisher,
  ChangedStateEventPublisher,
  ConvertedCurrencyEventPublisher,
  CreatedItemEventPublisher,
  DecreasePriceEventPublisher,
  GotCategoryEventPublisher,
} from '../../events/publishers';
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
  ChangeStateHelper,
  ChangeStateSellerHelper,
  ConvertCurrencyHelper,
  CreateItemHelper,
  DecreasePriceHelper,
  GetCategoryHelper,
  GetItemHelper,
  IncreasePriceHelper,
} from './helpers';
import { ChangeStateCategoryHelper } from './helpers/change-state-category';
import { GetSellerHelper } from './helpers/get-seller/get-seller-helper';

export class ItemAggregateRoot
  implements ISellerDomainService, IItemDomainService, ICategoryDomainService
{
  private readonly categoryService?: ICategoryDomainService;
  private readonly sellerService?: ISellerDomainService;
  private readonly itemService?: IItemDomainService;

  private readonly chgDescriptionCategoryEP: ChangedDescriptionCategoryEventPublisher<CategoryDomainEntity>;
  private readonly chgDescriptionEP: ChangedDescriptionEventPublisher<ItemDomainEntity>;
  private readonly chgEmailSellerEP: ChangedEmailSellerEventPublisher<SellerDomainEntity>;
  private readonly chgImageEP: ChangedImageEventPublisher<CategoryDomainEntity>;
  private readonly chgNameEP: ChangedNameCategoryEventPublisher<ItemDomainEntity>;
  private readonly chgNameCategoryEP: ChangedNameCategoryEventPublisher<CategoryDomainEntity>;
  private readonly chgNameSellerEP: ChangedNameCategoryEventPublisher<SellerDomainEntity>;
  private readonly chgStateCategoryEP: ChangedNameCategoryEventPublisher<CategoryDomainEntity>;
  private readonly chgStateSellerEP: ChangedNameCategoryEventPublisher<SellerDomainEntity>;
  private readonly chgStateEP: ChangedStateEventPublisher<ItemDomainEntity>;
  private readonly convertedCurrencyEP: ConvertedCurrencyEventPublisher<ItemDomainEntity>;
  private readonly createdItemEP: CreatedItemEventPublisher<ItemDomainEntity>;
  private readonly decreasePriceEP: DecreasePriceEventPublisher<ItemDomainEntity>;
  private readonly increasePriceEP: DecreasePriceEventPublisher<ItemDomainEntity>;
  private readonly gotCategoryEP: GotCategoryEventPublisher<CategoryDomainEntity>;
  private readonly gotItemEP: GotCategoryEventPublisher<ItemDomainEntity>;
  private readonly gotSellerEP: GotCategoryEventPublisher<SellerDomainEntity>;

  constructor({
    categoryService,
    sellerService,
    itemService,
    chgDescriptionCategoryEP,
    chgDescriptionEP,
    chgEmailSellerEP,
    chgImageCategoryEP,
    chgNameEP,
    chgNameCategoryEP,
    chgNameSellerEP,
    chgStateCategoryEP,
    chgStateSellerEP,
    chgStateEP,
    convertedCurrencyEP,
    createdItemEP,
    decreasePriceEP,
    increasePriceEP,
    gotCategoryEP,
    gotItemEP,
    gotSellerEP,
  }: {
    categoryService?: ICategoryDomainService;
    sellerService?: ISellerDomainService;
    itemService?: IItemDomainService;
    chgDescriptionCategoryEP: ChangedDescriptionCategoryEventPublisher<CategoryDomainEntity>;
    chgDescriptionEP: ChangedDescriptionEventPublisher<ItemDomainEntity>;
    chgEmailSellerEP: ChangedEmailSellerEventPublisher<SellerDomainEntity>;
    chgImageCategoryEP: ChangedImageEventPublisher<CategoryDomainEntity>;
    chgNameEP: ChangedNameCategoryEventPublisher<ItemDomainEntity>;
    chgNameCategoryEP: ChangedNameCategoryEventPublisher<CategoryDomainEntity>;
    chgNameSellerEP: ChangedNameCategoryEventPublisher<SellerDomainEntity>;
    chgStateCategoryEP: ChangedNameCategoryEventPublisher<CategoryDomainEntity>;
    chgStateSellerEP: ChangedNameCategoryEventPublisher<SellerDomainEntity>;
    chgStateEP: ChangedStateEventPublisher<ItemDomainEntity>;
    convertedCurrencyEP: ConvertedCurrencyEventPublisher<ItemDomainEntity>;
    createdItemEP: CreatedItemEventPublisher<ItemDomainEntity>;
    decreasePriceEP: DecreasePriceEventPublisher<ItemDomainEntity>;
    increasePriceEP: DecreasePriceEventPublisher<ItemDomainEntity>;
    gotCategoryEP: GotCategoryEventPublisher<CategoryDomainEntity>;
    gotItemEP: GotCategoryEventPublisher<ItemDomainEntity>;
    gotSellerEP: GotCategoryEventPublisher<SellerDomainEntity>;
  }) {
    this.categoryService = categoryService ?? this.categoryService;
    this.sellerService = sellerService ?? this.sellerService;
    this.itemService = itemService ?? this.itemService;
    this.chgDescriptionCategoryEP =
      chgDescriptionCategoryEP ?? this.chgDescriptionCategoryEP;
    this.chgDescriptionEP = chgDescriptionEP ?? this.chgDescriptionEP;
    this.chgEmailSellerEP = chgEmailSellerEP ?? this.chgEmailSellerEP;
    this.chgImageEP = chgImageCategoryEP ?? this.chgImageEP;
    this.chgNameEP = chgNameEP ?? this.chgNameEP;
    this.chgNameCategoryEP = chgNameCategoryEP ?? this.chgNameCategoryEP;
    this.chgNameSellerEP = chgNameSellerEP ?? this.chgNameSellerEP;
    this.chgStateCategoryEP = chgStateCategoryEP ?? this.chgStateCategoryEP;
    this.chgStateSellerEP = chgStateSellerEP ?? this.chgStateSellerEP;
    this.chgStateEP = chgStateEP ?? this.chgStateEP;
    this.convertedCurrencyEP = convertedCurrencyEP ?? this.convertedCurrencyEP;
    this.createdItemEP = createdItemEP ?? this.createdItemEP;
    this.decreasePriceEP = decreasePriceEP ?? this.decreasePriceEP;
    this.increasePriceEP = increasePriceEP ?? this.increasePriceEP;
    this.gotCategoryEP = gotCategoryEP ?? this.gotCategoryEP;
    this.gotItemEP = gotItemEP ?? this.gotItemEP;
    this.gotSellerEP = gotSellerEP ?? this.gotSellerEP;
  }
  getSeller(sellerId: string): Promise<SellerDomainEntity> {
    return GetSellerHelper(sellerId, this.sellerService, this.gotSellerEP);
  }
  changeName(itemId: string, name: string): Promise<ItemDomainEntity> {
    return ChangeNameHelper(itemId, name, this.itemService, this.chgNameEP);
  }
  createItem(item: ItemDomainEntity): Promise<ItemDomainEntity> {
    return CreateItemHelper(item, this.itemService, this.createdItemEP);
  }
  convertCurrency(
    itemId: string,
    currency: string,
    price: number,
  ): Promise<ItemDomainEntity> {
    return ConvertCurrencyHelper(
      itemId,
      currency,
      price,
      this.convertedCurrencyEP,
      this.itemService,
    );
  }
  getCategory(categoryId: string): Promise<CategoryDomainEntity> {
    return GetCategoryHelper(
      categoryId,
      this.categoryService,
      this.gotCategoryEP,
    );
  }
  changeNameCategory(
    categoryId: string,
    name: string,
  ): Promise<CategoryDomainEntity> {
    return ChangeNameCategoryHelper(
      categoryId,
      name,
      this.chgNameCategoryEP,
      this.categoryService,
    );
  }
  changeDescriptionCategory(
    categoryId: string,
    description: string,
  ): Promise<CategoryDomainEntity> {
    return ChangeDescriptionCategoryHelper(
      categoryId,
      description,
      this.chgDescriptionCategoryEP,
      this.categoryService,
    );
  }
  changeStateCategory(
    categoryId: string,
    state: boolean,
  ): Promise<CategoryDomainEntity> {
    return ChangeStateCategoryHelper(
      categoryId,
      state,
      this.chgStateCategoryEP,
      this.categoryService,
    );
  }
  getItem(itemId: string): Promise<ItemDomainEntity> {
    return GetItemHelper(itemId, this.itemService, this.gotItemEP);
  }
  changeDescription(
    itemId: string,
    description: string,
  ): Promise<ItemDomainEntity> {
    return ChangeDescriptionHelper(
      itemId,
      description,
      this.chgDescriptionEP,
      this.itemService,
    );
  }
  changeState(itemId: string, state: boolean): Promise<ItemDomainEntity> {
    return ChangeStateHelper(itemId, state, this.chgStateEP, this.itemService);
  }
  changeImage(itemId: string, image: string): Promise<ItemDomainEntity> {
    return ChangeImageHelper(itemId, image, this.chgNameEP, this.itemService);
  }
  increasePrice(itemId: string, price: number): Promise<ItemDomainEntity> {
    return IncreasePriceHelper(
      itemId,
      price,
      this.increasePriceEP,
      this.itemService,
    );
  }
  decreasePrice(itemId: string, price: number): Promise<ItemDomainEntity> {
    return DecreasePriceHelper(
      itemId,
      price,
      this.decreasePriceEP,
      this.itemService,
    );
  }
  changeNameSeller(
    sellerId: string,
    name: string,
  ): Promise<SellerDomainEntity> {
    return ChangeNameSellerHelper(
      sellerId,
      name,
      this.chgNameSellerEP,
      this.sellerService,
    );
  }
  changeStateSeller(
    sellerId: string,
    state: boolean,
  ): Promise<SellerDomainEntity> {
    return ChangeStateSellerHelper(
      sellerId,
      state,
      this.chgStateSellerEP,
      this.sellerService,
    );
  }
  changeEmailSeller(
    sellerId: string,
    email: string,
  ): Promise<SellerDomainEntity> {
    return ChangeEmailSellerHelper(
      sellerId,
      email,
      this.chgEmailSellerEP,
      this.sellerService,
    );
  }
}
