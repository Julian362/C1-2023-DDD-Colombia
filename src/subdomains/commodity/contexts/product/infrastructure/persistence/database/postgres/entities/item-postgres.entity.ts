import { ItemDomainEntity } from '@context/product/domain/entities';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { CategoryPostgresEntity } from './category-postgres.entity';
import { SellerPostgresEntity } from './seller-postgres.entity';

/**
 * clase ItemPostgresEntity que representa la entidad item
 *
 * @export
 * @class ItemPostgresEntity
 */
@Index('item_pkey', ['itemId'], { unique: true })
@Index('item_name_key', ['name'])
@Entity('item', { schema: 'public' })
export class ItemPostgresEntity extends ItemDomainEntity {
  /**
   *  campo itemId de tipo string
   *
   * @type {string}
   * @memberof ItemPostgresEntity
   */
  @Column('uuid', {
    primary: true,
    name: 'item_id',
    default: () => 'uuid_generate_v4()',
  })
  itemId: string;

  /**
   *  campo sellerId de tipo string
   *
   * @type {string}
   * @memberof ItemPostgresEntity
   */
  @Column('character varying', {
    name: 'name',
    length: 60,
  })
  name: string;

  /**
   *  campo description de tipo string
   *
   * @type {string}
   * @memberof ItemPostgresEntity
   */
  @Column('character varying', {
    name: 'description',
    length: 300,
  })
  description: string;

  /**
   *  campo price de tipo number
   *
   * @type {number}
   * @memberof ItemPostgresEntity
   */
  @Column('integer', {
    name: 'price',
  })
  price: number;

  /**
   *  campo image de tipo string
   *
   * @type {string}
   * @memberof ItemPostgresEntity
   */
  @Column('character varying', {
    name: 'image',
    length: 255,
  })
  image: string;

  /**
   *  campo state de tipo boolean
   *
   * @type {boolean}
   * @memberof ItemPostgresEntity
   */
  @Column('boolean', {
    name: 'state',
  })
  state: boolean;

  /**
   *  campo categories de tipo CategoryPostgresEntity[]
   *
   * @type {CategoryPostgresEntity[]}
   * @memberof ItemPostgresEntity
   */
  @ManyToMany(() => CategoryPostgresEntity, (category) => category.categoryId, {
    cascade: ['insert'],
  })
  @JoinTable()
  categories: CategoryPostgresEntity[];

  /**
   *  campo seller de tipo SellerPostgresEntity
   *
   * @type {SellerPostgresEntity}
   * @memberof ItemPostgresEntity
   */
  @ManyToOne(() => SellerPostgresEntity, (seller) => seller.sellerId, {
    cascade: ['insert'],
  })
  seller: SellerPostgresEntity;
}
