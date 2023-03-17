import { SellerDomainEntity } from '@context/product/domain/entities';
import { CreatedSellerEventPublisher } from '@context/product/domain/events/publishers/created-seller.event-publisher';
import { ISellerDomainService } from '@context/product/domain/services';
import { AggregateRootException } from '@sofka';

/**
 * helper para crear un vendedor
 *
 * @param {SellerDomainEntity} seller - vendedor a crear
 * @param {(ISellerDomainService )} sellerService - servicio de vendedor
 * @param {CreatedSellerEventPublisher<SellerDomainEntity>} createSellerEP - evento publicador de creación de vendedor
 * @return {Promise<SellerDomainEntity>} - retorna una promesa con el vendedor creado
 */
export const CreateSellerHelper = async (
  seller: SellerDomainEntity,
  sellerService?: ISellerDomainService,
  createSellerEP?: CreatedSellerEventPublisher<SellerDomainEntity>,
): Promise<SellerDomainEntity> => {
  if (!sellerService)
    throw new AggregateRootException('El servicio de vendedor no existe');
  if (!createSellerEP)
    throw new AggregateRootException(
      'El evento publicador de creación de vendedor no existe',
    );
  createSellerEP.response = await sellerService.createSeller(seller);
  createSellerEP.publish();
  return createSellerEP.response;
};
