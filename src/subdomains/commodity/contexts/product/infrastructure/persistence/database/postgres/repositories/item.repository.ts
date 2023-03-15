import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../entities/item.entity';
import { IBase } from './interfaces/base.interface';

/**
 * clase ItemRepository que implementa la interfaz IBase
 *
 * @export
 * @class ItemRepository
 * @implements {IBase<ItemEntity>}
 */
export class ItemRepository implements IBase<ItemEntity> {
  /**
   * crea una instancia de ItemRepository
   * @param {Repository<ItemEntity>} repository
   * @memberof ItemRepository
   */
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
  ) {}

  /**
   * método findAll que retorna un arreglo de objetos de tipo ItemEntity
   *
   * @param {ItemEntity} entity objeto de tipo ItemEntity
   * @return {Promise<ItemEntity>} retorna un arreglo de objetos de tipo ItemEntity
   * @memberof ItemRepository
   */
  async create(entity: ItemEntity): Promise<ItemEntity> {
    const result = await this.repository.save(entity);
    return result;
  }

  /**
   * método update que actualiza un registro
   *
   * @param {string} id identificador del registro
   * @param {ItemEntity} entity objeto de tipo ItemEntity
   * @return {Promise<ItemEntity>} retorna el registro actualizado
   * @memberof ItemRepository
   */
  async update(id: string, entity: ItemEntity): Promise<ItemEntity> {
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
   * @return {Promise<ItemEntity>} retorna el registro encontrado
   * @memberof ItemRepository
   */
  async findById(id: string): Promise<ItemEntity> {
    const result = await this.repository.findOneBy({ itemId: id });
    if (result) {
      return result;
    }
    throw new NotFoundException('Item not found');
  }
}
