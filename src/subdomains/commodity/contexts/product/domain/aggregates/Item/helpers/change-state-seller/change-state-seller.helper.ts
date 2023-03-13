import { SellerDomainEntity } from '@context/product/domain/entities';
import { ChangedStateSellerEventPublisher } from '@context/product/domain/events';
import { ISellerDomainService } from '@context/product/domain/services';

/**
 * helper para cambiar el estado de un vendedor
 *
 * @param {string} sellerId - id del vendedor
 * @param {boolean} state - estado a cambiar
 * @param {ChangedStateSellerEventPublisher<SellerDomainEntity>} changedStateSellerEventPublisher - evento publicador de cambio de estado de vendedor
 * @param {(ISellerDomainService )} sellerService - servicio de vendedor
 * @return {Promise<SellerDomainEntity>} retorna una promesa con el vendedor con el estado cambiado
 */
export const ChangeStateSellerHelper = async (
  sellerId: string,
  state: boolean,
  changedStateSellerEventPublisher?: ChangedStateSellerEventPublisher<SellerDomainEntity>,
  sellerService?: ISellerDomainService,
): Promise<SellerDomainEntity> => {
  if (!changedStateSellerEventPublisher)
    throw new Error(
      'El evento publicador de cambio de estado de vendedor no existe',
    );
  if (!sellerService) throw new Error('El servicio de vendedor no existe');
  changedStateSellerEventPublisher.response =
    await sellerService.changeStateSeller(sellerId, state);
  changedStateSellerEventPublisher.publish();
  return changedStateSellerEventPublisher.response;
};
