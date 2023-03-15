import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { ItemEntity } from './item.entity';

/**
 * clase CategoryEntity que representa la entidad category
 *
 * @export
 * @class CategoryEntity
 */
@Index('category_pkey', ['categoryId'], { unique: true })
@Index('category_name_key', ['name'])
@Entity('category', { schema: 'public' })
export class CategoryEntity {
  /**
   * campo categoryId de tipo string
   *
   * @type {string}
   * @memberof CategoryEntity
   */
  @Column('uuid', {
    primary: true,
    name: 'category_id',
    default: () => 'uuid_generate_v4()',
  })
  categoryId: string;

  /**
   * campo name de tipo string
   *
   * @type {string}
   * @memberof CategoryEntity
   */
  @Column('character varying', {
    name: 'name',
    length: 60,
  })
  name: string;

  /**
   * campo description de tipo string
   *
   * @type {string}
   * @memberof CategoryEntity
   */
  @Column('character varying', {
    name: 'description',
    length: 300,
  })
  description: string;

  /**
   * campo state de tipo boolean
   *
   * @type {boolean}
   * @memberof CategoryEntity
   */
  @Column('boolean', {
    name: 'state',
  })
  state: boolean;

  /**
   * campo items de tipo ItemEntity[]
   *
   * @type {ItemEntity[]}
   * @memberof CategoryEntity
   */
  @ManyToMany(() => ItemEntity, (item) => item.itemId)
  categories: ItemEntity[];
}
