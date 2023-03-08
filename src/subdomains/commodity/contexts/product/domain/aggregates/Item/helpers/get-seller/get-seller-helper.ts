import {
  GotCategoryEventPublisher,
  ISellerDomainService,
  SellerDomainEntity,
} from '@context/product/domain';

export const GetSellerHelper = async (
  sellerId: string,
  sellerService: ISellerDomainService | undefined,
  gotSellerEP: GotCategoryEventPublisher<SellerDomainEntity>,
): Promise<SellerDomainEntity> => {
  if (!sellerService) throw new Error('El servicios de vendedor no existe');
  if (!gotSellerEP)
    throw new Error('El evento publicador obtener vendedor  no existe');
  gotSellerEP.response = await sellerService.getSeller(sellerId);
  gotSellerEP.publish();
  return gotSellerEP.response;
};
