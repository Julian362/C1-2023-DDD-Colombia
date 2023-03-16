import { Module } from '@nestjs/common';
import { PostgresSQLModule } from './database/postgres/postgres.module';
import { ItemService } from './services/item.service';
import { CategoryService } from './services/category.service';
import { SellerService } from './services/seller.service';

@Module({
  imports: [PostgresSQLModule],
  controllers: [],
  providers: [ItemService, CategoryService, SellerService],
  exports: [ItemService, CategoryService, SellerService],
})
export class PersistenceModule {}
