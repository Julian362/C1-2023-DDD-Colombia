import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryPostgresEntity } from '../entities/category-postgres.entity';
import { IBase } from './interfaces/base.interface';

/**
 * clase CategoryRepository que implementa la interfaz IBase
 *
 * @export
 * @class CategoryRepository
 * @implements {IBase<CategoryPostgresEntity>}
 */
export class CategoryRepository implements IBase<CategoryPostgresEntity> {
  /**
   * crea una instancia de CategoryRepository
   * @param {Repository<CategoryPostgresEntity>} repository objeto de tipo Repository<CategoryPostgresEntity>
   * @memberof CategoryRepository
   */
  constructor(
    @InjectRepository(CategoryPostgresEntity)
    private readonly repository: Repository<CategoryPostgresEntity>,
  ) {}

  /**
   * método findAll que retorna un arreglo de objetos de tipo CategoryPostgresEntity
   *
   * @param {CategoryPostgresEntity} entity objeto de tipo CategoryPostgresEntity
   * @return {Promise<CategoryPostgresEntity>} retorna un arreglo de objetos de tipo CategoryPostgresEntity
   * @memberof CategoryRepository
   */
  async create(
    entity: CategoryPostgresEntity,
  ): Promise<CategoryPostgresEntity> {
    const result = await this.repository.save(entity);
    return result;
  }

  /**
   * método update que actualiza un registro
   *
   * @param {string} id identificador del registro
   * @param {CategoryPostgresEntity} entity objeto de tipo CategoryPostgresEntity
   * @return {Promise<CategoryPostgresEntity>} retorna el registro actualizado
   * @memberof CategoryRepository
   */
  async update(
    id: string,
    entity: CategoryPostgresEntity,
  ): Promise<CategoryPostgresEntity> {
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
   * @return {Promise<CategoryPostgresEntity>} retorna el registro encontrado
   * @memberof CategoryRepository
   */
  async findById(id: string): Promise<CategoryPostgresEntity> {
    const result = await this.repository.findOneBy({ categoryId: id });
    if (result) {
      return result;
    }
    throw new NotFoundException('category not found');
  }
}
