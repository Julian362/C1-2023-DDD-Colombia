import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/';
import { TypesOrmPostgresConfigService } from './configs/types-orm-postgres-config.service';
import { ItemRepository } from './repositories/item.repository';
import { ItemService } from './services/item.service';
import { ItemEntity } from './entities/item.entity';
import { SellerEntity } from './entities/seller.entity';
import { CategoryEntity } from './entities/category.entity';
import { PostgresController } from './postgres.controller';
import { SellerService } from './services/seller.service';
import { CategoryService } from './services/category.service';
import { SellerRepository } from './repositories/seller.repository';
import { CategoryRepository } from './repositories/category.repository';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypesOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([ItemEntity, SellerEntity, CategoryEntity]),
  ],
  controllers: [PostgresController],
  providers: [
    TypesOrmPostgresConfigService,
    ItemRepository,
    ItemService,
    SellerService,
    CategoryService,
    SellerRepository,
    CategoryRepository,
    ItemRepository,
  ],
  exports: [
    ItemService,
    SellerService,
    CategoryService,
    SellerRepository,
    CategoryRepository,
    ItemRepository,
  ],
})
export class PostgresSQLModule {}
