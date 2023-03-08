import {
  ChangedNameSellerEventPublisher,
  ISellerDomainService,
  SellerDomainEntity,
} from '@context/product/domain';

export const ChangeNameSellerHelper = async (
  sellerId: string,
  name: string,
  changedNameSellerEventPublisher: ChangedNameSellerEventPublisher<SellerDomainEntity>,
  sellerService: ISellerDomainService | undefined,
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
