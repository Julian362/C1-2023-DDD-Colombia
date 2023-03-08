import {
  ChangedStateSellerEventPublisher,
  ISellerDomainService,
  SellerDomainEntity,
} from '@context/product/domain';

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
