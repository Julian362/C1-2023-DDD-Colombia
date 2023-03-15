import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { ItemEntity } from './item.entity';

/**
 * clase SellerEntity que representa la entidad seller
 *
 * @export
 * @class SellerEntity
 */
@Index('seller_name_key', ['name'])
@Index('seller_pkey', ['sellerId'], { unique: true })
@Entity('seller', { schema: 'public' })
export class SellerEntity {
  /**
   *  campo sellerId de tipo string
   *
   * @type {string}
   * @memberof SellerEntity
   */
  @Column('uuid', {
    primary: true,
    name: 'seller_id',
    default: () => 'uuid_generate_v4()',
  })
  sellerId: string;

  /**
   *  campo name de tipo string
   *
   * @type {string}
   * @memberof SellerEntity
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
   * @memberof SellerEntity
   */
  @Column('character varying', {
    name: 'description',
    length: 300,
  })
  description: string;

  /**
   *  campo email de tipo string
   *
   * @type {string}
   * @memberof SellerEntity
   */
  @Column('character varying', {
    name: 'email',
    length: 100,
    unique: true,
  })
  email: string;

  /**
   *  campo state de tipo boolean
   *
   * @type {boolean}
   * @memberof SellerEntity
   */
  @Column('boolean', {
    name: 'state',
  })
  state: boolean;

  /**
   *  campo items de tipo ItemEntity[]
   *
   * @type {ItemEntity[]}
   * @memberof SellerEntity
   */
  @OneToMany(() => ItemEntity, (item) => item.itemId)
  items: ItemEntity[];
}
