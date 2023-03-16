import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/';
import { TypesOrmPostgresConfigService } from './configs/types-orm-postgres-config.service';
import { ItemRepository } from './repositories/item.repository';
import { ItemPostgresEntity } from './entities/item-postgres.entity';
import { SellerPostgresEntity } from './entities/seller-postgres.entity';
import { CategoryPostgresEntity } from './entities/category-postgres.entity';
import { SellerRepository } from './repositories/seller.repository';
import { CategoryRepository } from './repositories/category.repository';
import { ItemPostgresService } from './services/item-postgres.service';
import { SellerPostgresService } from './services/seller-postgres.service';
import { CategoryPostgresService } from './services/category-postgres.service';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypesOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([
      ItemPostgresEntity,
      SellerPostgresEntity,
      CategoryPostgresEntity,
    ]),
  ],
  controllers: [],
  providers: [
    TypesOrmPostgresConfigService,
    ItemRepository,
    ItemPostgresService,
    SellerPostgresService,
    CategoryPostgresService,
    SellerRepository,
    CategoryRepository,
    ItemRepository,
  ],
  exports: [
    ItemPostgresService,
    SellerPostgresService,
    CategoryPostgresService,
    SellerRepository,
    CategoryRepository,
    ItemRepository,
  ],
})
export class PostgresSQLModule {}
