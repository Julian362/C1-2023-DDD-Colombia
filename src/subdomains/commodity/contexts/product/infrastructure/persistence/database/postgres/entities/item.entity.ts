import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { SellerEntity } from './seller.entity';

/**
 * clase ItemEntity que representa la entidad item
 *
 * @export
 * @class ItemEntity
 */
@Index('item_pkey', ['itemId'], { unique: true })
@Index('item_name_key', ['name'])
@Entity('item', { schema: 'public' })
export class ItemEntity {
  /**
   *  campo itemId de tipo string
   *
   * @type {string}
   * @memberof ItemEntity
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
   * @memberof ItemEntity
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
   * @memberof ItemEntity
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
   * @memberof ItemEntity
   */
  @Column('integer', {
    name: 'price',
  })
  price: number;

  /**
   *  campo image de tipo string
   *
   * @type {string}
   * @memberof ItemEntity
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
   * @memberof ItemEntity
   */
  @Column('boolean', {
    name: 'state',
  })
  state: boolean;

  /**
   *  campo categories de tipo CategoryEntity[]
   *
   * @type {CategoryEntity[]}
   * @memberof ItemEntity
   */
  @ManyToMany(() => CategoryEntity, (category) => category.categoryId, {
    cascade: ['insert'],
  })
  @JoinTable()
  categories: CategoryEntity[];

  /**
   *  campo seller de tipo SellerEntity
   *
   * @type {SellerEntity}
   * @memberof ItemEntity
   */
  @ManyToOne(() => SellerEntity, (seller) => seller.sellerId, {
    cascade: ['insert'],
  })
  seller: SellerEntity;
}
