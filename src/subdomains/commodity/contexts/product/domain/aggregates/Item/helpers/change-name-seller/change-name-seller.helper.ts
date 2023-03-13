import { SellerDomainEntity } from '@context/product/domain/entities';
import { ChangedNameSellerEventPublisher } from '@context/product/domain/events';
import { ISellerDomainService } from '@context/product/domain/services';

/**
 * helper para cambiar el nombre de un vendedor
 *
 * @param {string} sellerId - id del vendedor
 * @param {string} name - nombre a cambiar
 * @param {ChangedNameSellerEventPublisher<SellerDomainEntity>} changedNameSellerEventPublisher - evento publicador de cambio de nombre de vendedor
 * @param {(ISellerDomainService )} sellerService - servicio de vendedor
 * @return {Promise<SellerDomainEntity>} retorna una promesa con el vendedor con el nombre cambiado
 */
export const ChangeNameSellerHelper = async (
  sellerId: string,
  name: string,
  changedNameSellerEventPublisher?: ChangedNameSellerEventPublisher<SellerDomainEntity>,
  sellerService?: ISellerDomainService,
): Promise<SellerDomainEntity> => {
  if (!changedNameSellerEventPublisher)
    throw new Error(
      'El evento publicador de cambio de nombre de vendedor no existe',
    );
  if (!sellerService) throw new Error('El servicio de vendedor no existe');
  changedNameSellerEventPublisher.response =
    await sellerService.changeNameSeller(sellerId, name);
  changedNameSellerEventPublisher.publish();
  return changedNameSellerEventPublisher.response;
};
