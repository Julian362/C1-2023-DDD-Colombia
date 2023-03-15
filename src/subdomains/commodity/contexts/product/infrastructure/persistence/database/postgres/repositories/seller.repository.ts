import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from '../entities/seller.entity';
import { IBase } from './interfaces/base.interface';

/**
 * clase SellerRepository que implementa la interfaz IBase
 *
 * @export
 * @class SellerRepository
 * @implements {IBase<SellerEntity>}
 */
export class SellerRepository implements IBase<SellerEntity> {
  /**
   * crea una instancia de SellerRepository
   * @param {Repository<SellerEntity>} repository
   * @memberof SellerRepository
   */
  constructor(
    @InjectRepository(SellerEntity)
    private readonly repository: Repository<SellerEntity>,
  ) {}

  /**
   * método findAll que retorna un arreglo de objetos de tipo SellerEntity
   *
   * @param {SellerEntity} entity
   * @return {Promise<SellerEntity>} retorna un arreglo de objetos de tipo SellerEntity
   * @memberof SellerRepository
   */
  async create(entity: SellerEntity): Promise<SellerEntity> {
    const result = await this.repository.save(entity);
    return result;
  }

  /**
   * método update que actualiza un registro
   *
   * @param {string} id
   * @param {SellerEntity} entity
   * @return NotFoundException{Promise<SellerEntity>}
   * @memberof SellerRepository
   */
  async update(id: string, entity: SellerEntity): Promise<SellerEntity> {
    const data = await this.repository.findOneBy({ sellerId: id });
    if (data) {
      const newEntity = {
        ...entity,
        id,
      };
      return await this.repository.save(newEntity);
    }
    throw new NotFoundException('seller not found');
  }

  /**
   *
   *
   * @param {string} id
   * @return NotFoundException{Promise<boolean>}
   * @memberof SellerRepository
   */
  async delete(id: string): Promise<boolean> {
    const data = await this.repository.findOneBy({ sellerId: id });
    if (data) {
      await this.repository.remove(data);
      return true;
    }
    throw new NotFoundException('seller not found');
  }

  /**
   *
   *
   * @param {string} id
   * @return NotFoundException{Promise<SellerEntity>}
   * @memberof SellerRepository
   */
  async findById(id: string): Promise<SellerEntity> {
    const result = await this.repository.findOneBy({ sellerId: id });
    if (result) {
      return result;
    }
    throw new NotFoundException('seller not found');
  }
}
