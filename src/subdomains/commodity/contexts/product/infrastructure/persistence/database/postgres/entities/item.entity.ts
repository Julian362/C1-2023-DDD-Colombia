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

@Index('item_pkey', ['itemId'], { unique: true })
@Index('item_name_key', ['name'])
@Entity('item', { schema: 'public' })
export class ItemEntity {
  @Column('uuid', {
    primary: true,
    name: 'item_id',
    default: () => 'uuid_generate_v4()',
  })
  itemId: string;

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

  @Column('integer', {
    name: 'price',
  })
  price: number;

  @Column('character varying', {
    name: 'image',
    length: 255,
  })
  image: string;

  @Column('boolean', {
    name: 'state',
  })
  state: boolean;

  @ManyToMany(() => CategoryEntity, (category) => category.categoryId, {
    cascade: ['insert'],
  })
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToOne(() => SellerEntity, (seller) => seller.sellerId)
  seller: SellerEntity;
}
