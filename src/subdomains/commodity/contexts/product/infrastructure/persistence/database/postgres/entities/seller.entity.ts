import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { ItemEntity } from './item.entity';

@Index('seller_name_key', ['name'])
@Index('seller_pkey', ['sellerId'], { unique: true })
@Entity('seller', { schema: 'public' })
export class SellerEntity {
  @Column('uuid', {
    primary: true,
    name: 'seller_id',
    default: () => 'uuid_generate_v4()',
  })
  sellerId: string;

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
  @Column('character varying', {
    name: 'email',
    length: 100,
    unique: true,
  })
  email: string;

  @Column('boolean', {
    name: 'state',
  })
  state: boolean;

  @OneToMany(() => ItemEntity, (item) => item.itemId)
  items: ItemEntity[];
}
