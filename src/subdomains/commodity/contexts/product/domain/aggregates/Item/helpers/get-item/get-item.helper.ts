import {
  GotItemEventPublisher,
  IItemDomainService,
  ItemDomainEntity,
} from '@context/product/domain';

/**
 * helper para obtener un producto
 *
 * @param {string} itemId - Id del producto
 * @param {(IItemDomainService | undefined)} itemService - Servicio de producto
 * @param {GotItemEventPublisher<ItemDomainEntity>} gotItemEP - Evento publicador de obtener producto
 * @return {Promise<ItemDomainEntity>} - retorna una promesa con el producto
 */
export const GetItemHelper = async (
  itemId: string,
  itemService: IItemDomainService | undefined,
  gotItemEP: GotItemEventPublisher<ItemDomainEntity>,
): Promise<ItemDomainEntity> => {
  if (!itemService) throw new Error('El servicio de vendedor no existe');
  if (!gotItemEP)
    throw new Error('El evento publicador de obtener producto no existe');
  gotItemEP.response = await itemService.getItem(itemId);
  gotItemEP.publish();
  return gotItemEP.response;
};
