import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { ItemPostgresEntity } from '../entities/item-postgres.entity';
import { IBase } from './interfaces/base.interface';

/**
 * clase ItemRepository que implementa la interfaz IBase
 *
 * @export
 * @class ItemRepository
 * @implements {IBase<ItemPostgresEntity>}
 */
export class ItemRepository implements IBase<ItemPostgresEntity> {
  /**
   * crea una instancia de ItemRepository
   * @param {Repository<ItemPostgresEntity>} repository
   * @memberof ItemRepository
   */
  constructor(
    @InjectRepository(ItemPostgresEntity)
    private readonly repository: Repository<ItemPostgresEntity>,
  ) {}

  /**
   * método findAll que retorna un arreglo de objetos de tipo ItemPostgresEntity
   *
   * @param {ItemPostgresEntity} entity objeto de tipo ItemPostgresEntity
   * @return {Promise<ItemPostgresEntity>} retorna un arreglo de objetos de tipo ItemPostgresEntity
   * @memberof ItemRepository
   */
  async create(entity: ItemPostgresEntity): Promise<ItemPostgresEntity> {
    const data = await this.repository.findBy({ itemId: entity.itemId });
    if (data.length > 0) {
      throw new QueryFailedError('', [], 'El id ya esta registrado');
    }
    const result = await this.repository.save(entity);
    return result;
  }

  /**
   * método update que actualiza un registro
   *
   * @param {string} id identificador del registro
   * @param {ItemPostgresEntity} entity objeto de tipo ItemPostgresEntity
   * @return {Promise<ItemPostgresEntity>} retorna el registro actualizado
   * @memberof ItemRepository
   */
  async update(
    id: string,
    entity: ItemPostgresEntity,
  ): Promise<ItemPostgresEntity> {
    const data = await this.repository.findOneBy({ itemId: id });
    if (data) {
      const newEntity = {
        ...entity,
        id,
      };
      return await this.repository.save(newEntity);
    }
    throw new NotFoundException('Item not found');
  }

  /**
   * método delete que elimina un registro
   *
   * @param {string} id identificador del registro
   * @return {Promise<boolean>} retorna true si el registro fue eliminado
   * @memberof ItemRepository
   */
  async delete(id: string): Promise<boolean> {
    const data = await this.repository.findOneBy({ itemId: id });
    if (data) {
      await this.repository.remove(data);
      return true;
    }
    throw new NotFoundException('Item not found');
  }

  /**
   * método findById que busca un registro por su identificador
   *
   * @param {string} id
   * @return {Promise<ItemPostgresEntity>} retorna el registro encontrado
   * @memberof ItemRepository
   */
  async findById(id: string): Promise<ItemPostgresEntity> {
    const result = await this.repository.findOneBy({ itemId: id });
    if (result) {
      return result;
    }
    throw new NotFoundException('Item not found');
  }
}
