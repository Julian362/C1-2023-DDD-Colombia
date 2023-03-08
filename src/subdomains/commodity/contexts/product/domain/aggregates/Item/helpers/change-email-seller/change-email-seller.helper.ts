import { ISellerDomainService } from '@context/product/domain';
import { SellerDomainEntity } from '../../../../entities';
import { ChangedEmailSellerEventPublisher } from '../../../../events/publishers/changed-email-seller.event-publisher';
export const ChangeEmailSellerHelper = async (
  sellerId: string,
  email: string,
  changedEmailSellerEventPublisher: ChangedEmailSellerEventPublisher,
  sellerService: ISellerDomainService | undefined,
): Promise<SellerDomainEntity> => {
  if (!changedEmailSellerEventPublisher)
    throw new Error(
      'El evento publicador de cambio de email de vendedor no existe',
    );
  if (!sellerService) throw new Error('El servicio de vendedor no existe');
  changedEmailSellerEventPublisher.response =
    await sellerService.changeEmailSeller(sellerId, email);
  changedEmailSellerEventPublisher.publish();
  return changedEmailSellerEventPublisher.response;
};
