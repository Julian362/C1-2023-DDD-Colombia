import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { IBase } from './interfaces/base.interface';

/**
 * clase CategoryRepository que implementa la interfaz IBase
 *
 * @export
 * @class CategoryRepository
 * @implements {IBase<CategoryEntity>}
 */
export class CategoryRepository implements IBase<CategoryEntity> {
  /**
   * crea una instancia de CategoryRepository
   * @param {Repository<CategoryEntity>} repository objeto de tipo Repository<CategoryEntity>
   * @memberof CategoryRepository
   */
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  /**
   * método findAll que retorna un arreglo de objetos de tipo CategoryEntity
   *
   * @param {CategoryEntity} entity objeto de tipo CategoryEntity
   * @return {Promise<CategoryEntity>} retorna un arreglo de objetos de tipo CategoryEntity
   * @memberof CategoryRepository
   */
  async create(entity: CategoryEntity): Promise<CategoryEntity> {
    const result = await this.repository.save(entity);
    return result;
  }

  /**
   * método update que actualiza un registro
   *
   * @param {string} id identificador del registro
   * @param {CategoryEntity} entity objeto de tipo CategoryEntity
   * @return {Promise<CategoryEntity>} retorna el registro actualizado
   * @memberof CategoryRepository
   */
  async update(id: string, entity: CategoryEntity): Promise<CategoryEntity> {
    const data = await this.repository.findOneBy({ categoryId: id });
    if (data) {
      const newEntity = {
        ...entity,
        id,
      };
      return await this.repository.save(newEntity);
    }
    throw new NotFoundException('category not found');
  }

  /**
   * método delete que elimina un registro
   *
   * @param {string} id identificador del registro
   * @return {Promise<boolean>} retorna true si se elimino el registro
   * @memberof CategoryRepository
   */
  async delete(id: string): Promise<boolean> {
    const data = await this.repository.findOneBy({ categoryId: id });
    if (data) {
      await this.repository.remove(data);
      return true;
    }
    throw new NotFoundException('category not found');
  }

  /**
   * método findById que busca un registro por su id
   *
   * @param {string} id identificador del registro
   * @return {Promise<CategoryEntity>} retorna el registro encontrado
   * @memberof CategoryRepository
   */
  async findById(id: string): Promise<CategoryEntity> {
    const result = await this.repository.findOneBy({ categoryId: id });
    if (result) {
      return result;
    }
    throw new NotFoundException('category not found');
  }
}
