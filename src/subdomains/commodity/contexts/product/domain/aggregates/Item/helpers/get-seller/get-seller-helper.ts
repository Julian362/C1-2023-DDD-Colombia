import { SellerDomainEntity } from '@context/product/domain/entities';
import { GotCategoryEventPublisher } from '@context/product/domain/events';
import { ISellerDomainService } from '@context/product/domain/services';

/**
 * helper para obtener un vendedor
 *
 * @param {string} sellerId id del vendedor
 * @param {(ISellerDomainService )} sellerService servicio de vendedor
 * @param {GotCategoryEventPublisher<SellerDomainEntity>} gotSellerEP evento publicador de obtener vendedor
 * @return {Promise<SellerDomainEntity>} retorna la promesa de un vendedor
 */
export const GetSellerHelper = async (
  sellerId: string,
  sellerService?: ISellerDomainService,
  gotSellerEP?: GotCategoryEventPublisher<SellerDomainEntity>,
): Promise<SellerDomainEntity> => {
  if (!sellerService) throw new Error('El servicios de vendedor no existe');
  if (!gotSellerEP)
    throw new Error('El evento publicador obtener vendedor  no existe');
  gotSellerEP.response = await sellerService.getSeller(sellerId);
  gotSellerEP.publish();
  return gotSellerEP.response;
};
