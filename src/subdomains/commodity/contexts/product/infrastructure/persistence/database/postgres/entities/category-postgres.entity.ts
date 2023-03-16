import { CategoryDomainEntity } from '@context/product/domain/entities';
import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { ItemPostgresEntity } from './item-postgres.entity';

/**
 * clase CategoryPostgresEntity que representa la entidad category
 *
 * @export
 * @class CategoryPostgresEntity
 */
@Index('category_pkey', ['categoryId'], { unique: true })
@Index('category_name_key', ['name'])
@Entity('category', { schema: 'public' })
export class CategoryPostgresEntity extends CategoryDomainEntity {
  /**
   * campo categoryId de tipo string
   *
   * @type {string}
   * @memberof CategoryPostgresEntity
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
   * @memberof CategoryPostgresEntity
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
   * @memberof CategoryPostgresEntity
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
   * @memberof CategoryPostgresEntity
   */
  @Column('boolean', {
    name: 'state',
  })
  state: boolean;

  /**
   * campo items de tipo ItemPostgresEntity[]
   *
   * @type {ItemPostgresEntity[]}
   * @memberof CategoryPostgresEntity
   */
  @ManyToMany(() => ItemPostgresEntity, (item) => item.itemId)
  categories: ItemPostgresEntity[];
}
