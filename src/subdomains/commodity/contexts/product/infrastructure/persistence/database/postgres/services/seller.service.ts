import { SellerDomainEntity } from '@context/product/domain/entities';
import { ISellerDomainService } from '@context/product/domain/services';
import { Injectable } from '@nestjs/common';
import { SellerEntity } from '../entities/seller.entity';
import { SellerRepository } from '../repositories/seller.repository';

@Injectable()
export class SellerService implements ISellerDomainService {
  constructor(private readonly sellerRepository: SellerRepository) {}
  getSeller(sellerId: string): Promise<SellerDomainEntity> {
    return this.sellerRepository.findById(sellerId);
  }
  changeNameSeller(
    sellerId: string,
    name: string,
  ): Promise<SellerDomainEntity> {
    const data = new SellerEntity();
    data.name = name;
    return this.sellerRepository.update(sellerId, data);
  }
  changeStateSeller(
    sellerId: string,
    state: boolean,
  ): Promise<SellerDomainEntity> {
    const data = new SellerEntity();
    data.state = state;
    return this.sellerRepository.update(sellerId, data);
  }
  changeEmailSeller(
    sellerId: string,
    email: string,
  ): Promise<SellerDomainEntity> {
    const data = new SellerEntity();
    data.email = email;
    return this.sellerRepository.update(sellerId, data);
  }
}
