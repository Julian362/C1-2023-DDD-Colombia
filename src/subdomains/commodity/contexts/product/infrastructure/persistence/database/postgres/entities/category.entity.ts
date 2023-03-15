import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { ItemEntity } from './item.entity';

@Index('category_pkey', ['categoryId'], { unique: true })
@Index('category_name_key', ['name'])
@Entity('category', { schema: 'public' })
export class CategoryEntity {
  @Column('uuid', {
    primary: true,
    name: 'category_id',
    default: () => 'uuid_generate_v4()',
  })
  categoryId: string;

  @Column('character varying', {
    name: 'name',
    length: 60,
  })
  name: string;

  @Column('character varying', {
    name: 'description',
    length: 300,
  })
  description: string;

  @Column('boolean', {
    name: 'state',
  })
  state: boolean;

  @ManyToMany(() => ItemEntity, (item) => item.itemId)
  categories: ItemEntity[];
}
