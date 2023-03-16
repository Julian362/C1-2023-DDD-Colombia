import { ISellerDomainService } from '@context/product/domain/services';
import { Injectable } from '@nestjs/common';
import { SellerPostgresEntity } from '../entities/seller-postgres.entity';
import { SellerRepository } from '../repositories/seller.repository';

/**
 * clase que representa el servicio de dominio de vendedor
 *
 * @export
 * @class SellerPostgresService
 * @implements {ISellerDomainService}
 */
@Injectable()
export class SellerPostgresService
  implements ISellerDomainService<SellerPostgresEntity>
{
  /**
   * Creates an instance of SellerPostgresService.
   * @param {SellerRepository} sellerRepository
   * @memberof SellerPostgresService
   */
  constructor(private readonly sellerRepository: SellerRepository) {}
  /**
   * crea un vendedor
   *
   * @param {SellerPostgresEntity} seller vendedor a crear
   * @return {Promise<SellerPostgresEntity>} retorna una promesa con el vendedor
   * @memberof SellerPostgresService
   */
  createSeller(seller: SellerPostgresEntity): Promise<SellerPostgresEntity> {
    return this.sellerRepository.create(seller);
  }
  /**
   * obtiene un vendedor
   *
   * @param {string} sellerId id del vendedor
   * @return {Promise<SellerPostgresEntity>} retorna una promesa con el vendedor
   * @memberof SellerPostgresService
   */
  getSeller(sellerId: string): Promise<SellerPostgresEntity> {
    return this.sellerRepository.findById(sellerId);
  }
  /**
   * cambia el nombre del vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {string} name nombre del vendedor
   * @return {Promise<SellerPostgresEntity>} retorna una promesa con el vendedor
   * @memberof SellerPostgresService
   */
  changeNameSeller(
    sellerId: string,
    name: string,
  ): Promise<SellerPostgresEntity> {
    const data = new SellerPostgresEntity();
    data.name = name;
    return this.sellerRepository.update(sellerId, data);
  }
  /**
   * cambia el estado del vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {boolean} state estado del vendedor
   * @return {Promise<SellerPostgresEntity>} retorna una promesa con el vendedor
   * @memberof SellerPostgresService
   */
  changeStateSeller(
    sellerId: string,
    state: boolean,
  ): Promise<SellerPostgresEntity> {
    const data = new SellerPostgresEntity();
    data.state = state;
    return this.sellerRepository.update(sellerId, data);
  }
  /**
   * cambia el email del vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {string} email email del vendedor
   * @return {Promise<SellerPostgresEntity>} retorna una promesa con el vendedor
   * @memberof SellerPostgresService
   */
  changeEmailSeller(
    sellerId: string,
    email: string,
  ): Promise<SellerPostgresEntity> {
    const data = new SellerPostgresEntity();
    data.email = email;
    return this.sellerRepository.update(sellerId, data);
  }
}
