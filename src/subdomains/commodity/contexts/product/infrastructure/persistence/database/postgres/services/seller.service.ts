import { SellerDomainEntity } from '@context/product/domain/entities';
import { ISellerDomainService } from '@context/product/domain/services';
import { Injectable } from '@nestjs/common';
import { SellerEntity } from '../entities/seller.entity';
import { SellerRepository } from '../repositories/seller.repository';

/**
 * clase que representa el servicio de dominio de vendedor
 *
 * @export
 * @class SellerService
 * @implements {ISellerDomainService}
 */
@Injectable()
export class SellerService implements ISellerDomainService {
  /**
   * Creates an instance of SellerService.
   * @param {SellerRepository} sellerRepository
   * @memberof SellerService
   */
  constructor(private readonly sellerRepository: SellerRepository) {}
  /**
   * obtiene un vendedor
   *
   * @param {string} sellerId id del vendedor
   * @return {Promise<SellerDomainEntity>} retorna una promesa con el vendedor
   * @memberof SellerService
   */
  getSeller(sellerId: string): Promise<SellerDomainEntity> {
    return this.sellerRepository.findById(sellerId);
  }
  /**
   * cambia el nombre del vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {string} name nombre del vendedor
   * @return {Promise<SellerDomainEntity>} retorna una promesa con el vendedor
   * @memberof SellerService
   */
  changeNameSeller(
    sellerId: string,
    name: string,
  ): Promise<SellerDomainEntity> {
    const data = new SellerEntity();
    data.name = name;
    return this.sellerRepository.update(sellerId, data);
  }
  /**
   * cambia el estado del vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {boolean} state estado del vendedor
   * @return {Promise<SellerDomainEntity>} retorna una promesa con el vendedor
   * @memberof SellerService
   */
  changeStateSeller(
    sellerId: string,
    state: boolean,
  ): Promise<SellerDomainEntity> {
    const data = new SellerEntity();
    data.state = state;
    return this.sellerRepository.update(sellerId, data);
  }
  /**
   * cambia el email del vendedor
   *
   * @param {string} sellerId id del vendedor
   * @param {string} email email del vendedor
   * @return {Promise<SellerDomainEntity>} retorna una promesa con el vendedor
   * @memberof SellerService
   */
  changeEmailSeller(
    sellerId: string,
    email: string,
  ): Promise<SellerDomainEntity> {
    const data = new SellerEntity();
    data.email = email;
    return this.sellerRepository.update(sellerId, data);
  }
}
