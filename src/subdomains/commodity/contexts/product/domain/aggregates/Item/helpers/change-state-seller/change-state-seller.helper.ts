import {
  ChangedStateSellerEventPublisher,
  ISellerDomainService,
  SellerDomainEntity,
} from '@context/product/domain';

/**
 * helper para cambiar el estado de un vendedor
 *
 * @param {string} sellerId - id del vendedor
 * @param {boolean} state - estado a cambiar
 * @param {ChangedStateSellerEventPublisher<SellerDomainEntity>} changedStateSellerEventPublisher - evento publicador de cambio de estado de vendedor
 * @param {(ISellerDomainService | undefined)} sellerService - servicio de vendedor
 * @return {Promise<SellerDomainEntity>} retorna una promesa con el vendedor con el estado cambiado
 */
export const ChangeStateSellerHelper = async (
  sellerId: string,
  state: boolean,
  changedStateSellerEventPublisher: ChangedStateSellerEventPublisher<SellerDomainEntity>,
  sellerService: ISellerDomainService | undefined,
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
