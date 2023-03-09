import {
  CreatedItemEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

/**
 * helper para crear un producto
 *
 * @param {ItemDomainEntity} item - producto a crear
 * @param {(IItemDomainService | undefined)} itemService - servicio de producto
 * @param {CreatedItemEventPublisher<ItemDomainEntity>} createItemEP - evento publicador de creación de producto
 * @return {Promise<ItemDomainEntity>} - retorna una promesa con el producto creado
 */
export const CreateItemHelper = async (
  item: ItemDomainEntity,
  itemService: IItemDomainService | undefined,
  createItemEP: CreatedItemEventPublisher<ItemDomainEntity>,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!createItemEP)
    throw new Error('El evento publicador de creación de producto no existe');
  createItemEP.response = await itemService.createItem(item);
  createItemEP.publish();
  return createItemEP.response;
};
