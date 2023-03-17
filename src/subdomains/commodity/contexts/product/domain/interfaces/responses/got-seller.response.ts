import { SellerDomainEntity } from '../../entities/seller.domain-entity';

/**
 * interfaz para la respuesta de la obtencion de un vendedor
 *
 * @export
 * @interface IGotSellerResponse
 */
export interface IGotSellerResponse {
  /**
   * vendedor obtenido
   *
   * @type {(SellerDomainEntity | null)}
   * @memberof IGotSellerResponse
   */
  seller: SellerDomainEntity | null;
}
