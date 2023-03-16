import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerPostgresEntity } from '../entities/seller-postgres.entity';
import { IBase } from './interfaces/base.interface';

/**
 * clase SellerRepository que implementa la interfaz IBase
 *
 * @export
 * @class SellerRepository
 * @implements {IBase<SellerPostgresEntity>}
 */
export class SellerRepository implements IBase<SellerPostgresEntity> {
  /**
   * crea una instancia de SellerRepository
   * @param {Repository<SellerPostgresEntity>} repository
   * @memberof SellerRepository
   */
  constructor(
    @InjectRepository(SellerPostgresEntity)
    private readonly repository: Repository<SellerPostgresEntity>,
  ) {}

  /**
   * método findAll que retorna un arreglo de objetos de tipo SellerPostgresEntity
   *
   * @param {SellerPostgresEntity} entity
   * @return {Promise<SellerPostgresEntity>} retorna un arreglo de objetos de tipo SellerPostgresEntity
   * @memberof SellerRepository
   */
  async create(entity: SellerPostgresEntity): Promise<SellerPostgresEntity> {
    const result = await this.repository.save(entity);
    return result;
  }

  /**
   * método update que actualiza un registro
   *
   * @param {string} id
   * @param {SellerPostgresEntity} entity
   * @return NotFoundException{Promise<SellerPostgresEntity>}
   * @memberof SellerRepository
   */
  async update(
    id: string,
    entity: SellerPostgresEntity,
  ): Promise<SellerPostgresEntity> {
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
   * @return NotFoundException{Promise<SellerPostgresEntity>}
   * @memberof SellerRepository
   */
  async findById(id: string): Promise<SellerPostgresEntity> {
    const result = await this.repository.findOneBy({ sellerId: id });
    if (result) {
      return result;
    }
    throw new NotFoundException('seller not found');
  }
}