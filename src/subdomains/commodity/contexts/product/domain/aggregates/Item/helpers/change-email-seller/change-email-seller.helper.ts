import { SellerDomainEntity } from '@context/product/domain/entities';
import { ChangedEmailSellerEventPublisher } from '@context/product/domain/events';
import { ISellerDomainService } from '@context/product/domain/services';

/**
 * helper para cambiar el email de un vendedor
 *
 * @param {string} sellerId - id del vendedor
 * @param {string} email - email a cambiar
 * @param {ChangedEmailSellerEventPublisher} changedEmailSellerEventPublisher - evento publicador de cambio de email de vendedor
 * @param {(ISellerDomainService )} sellerService - servicio de vendedor
 * @return {Promise<SellerDomainEntity>} retorna una promesa con el vendedor con el email cambiado
 */
export const ChangeEmailSellerHelper = async (
  sellerId: string,
  email: string,
  changedEmailSellerEventPublisher?: ChangedEmailSellerEventPublisher,
  sellerService?: ISellerDomainService,
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
