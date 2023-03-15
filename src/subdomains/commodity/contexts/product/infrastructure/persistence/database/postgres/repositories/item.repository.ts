import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../entities/item.entity';
import { IBase } from './interfaces/base.interface';

export class ItemRepository implements IBase<ItemEntity> {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
  ) {}

  async create(entity: ItemEntity): Promise<ItemEntity> {
    const result = await this.repository.save(entity);
    return result;
  }

  async update(id: string, entity: ItemEntity): Promise<ItemEntity> {
    const data = await this.repository.findOneBy({ itemId: id });
    if (data) {
      const newEntity = {
        ...data,
        ...entity,
        id,
      };
      return await this.repository.save(newEntity);
    }
    throw new Error('Item not found');
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.repository.findOneBy({ itemId: id });
    if (data) {
      await this.repository.remove(data);
      return true;
    }
    throw new Error('Item not found');
  }

  async findAll(): Promise<ItemEntity[]> {
    const result = await this.repository.find();
    return result;
  }

  async findById(id: string): Promise<ItemEntity> {
    const result = await this.repository.findOneBy({ itemId: id });
    if (result) {
      return result;
    }
    throw new Error('Item not found');
  }
}
