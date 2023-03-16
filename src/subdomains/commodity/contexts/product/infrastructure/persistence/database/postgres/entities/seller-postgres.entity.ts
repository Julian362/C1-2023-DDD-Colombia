import { SellerDomainEntity } from '@context/product/domain/entities';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ItemPostgresEntity } from './item-postgres.entity';

/**
 * clase SellerPostgresEntity que representa la entidad seller
 *
 * @export
 * @class SellerPostgresEntity
 */
@Index('seller_name_key', ['name'])
@Index('seller_pkey', ['sellerId'], { unique: true })
@Entity('seller', { schema: 'public' })
export class SellerPostgresEntity extends SellerDomainEntity {
  /**
   *  campo sellerId de tipo string
   *
   * @type {string}
   * @memberof SellerPostgresEntity
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
   * @memberof SellerPostgresEntity
   */
  @Column('character varying', {
    name: 'name',
    length: 60,
  })
  name: string;

  /**
   *  campo email de tipo string
   *
   * @type {string}
   * @memberof SellerPostgresEntity
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
   * @memberof SellerPostgresEntity
   */
  @Column('boolean', {
    name: 'state',
  })
  state: boolean;

  /**
   *  campo items de tipo ItemPostgresEntity[]
   *
   * @type {ItemPostgresEntity[]}
   * @memberof SellerPostgresEntity
   */
  @OneToMany(() => ItemPostgresEntity, (item) => item.itemId)
  items: ItemPostgresEntity[];
}
