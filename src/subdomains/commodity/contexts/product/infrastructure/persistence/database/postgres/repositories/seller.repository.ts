import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from '../entities/seller.entity';
import { IBase } from './interfaces/base.interface';

export class SellerRepository implements IBase<SellerEntity> {
  constructor(
    @InjectRepository(SellerEntity)
    private readonly repository: Repository<SellerEntity>,
  ) {}

  async create(entity: SellerEntity): Promise<SellerEntity> {
    const result = await this.repository.save(entity);
    return result;
  }

  async update(id: string, entity: SellerEntity): Promise<SellerEntity> {
    const data = await this.repository.findOneBy({ sellerId: id });
    if (data) {
      const newEntity = {
        ...data,
        ...entity,
        id,
      };
      return await this.repository.save(newEntity);
    }
    throw new Error('seller not found');
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.repository.findOneBy({ sellerId: id });
    if (data) {
      await this.repository.remove(data);
      return true;
    }
    throw new Error('seller not found');
  }

  async findAll(): Promise<SellerEntity[]> {
    const result = await this.repository.find();
    return result;
  }

  async findById(id: string): Promise<SellerEntity> {
    const result = await this.repository.findOneBy({ sellerId: id });
    if (result) {
      return result;
    }
    throw new Error('seller not found');
  }
}
