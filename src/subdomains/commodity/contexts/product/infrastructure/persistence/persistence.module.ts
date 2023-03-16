import { Module } from '@nestjs/common';
import { PostgresSQLModule } from './database/postgres/postgres.module';
import { ItemService } from './services/item.service';
import { CategoryService } from './services/category.service';
import { SellerService } from './services/seller.service';
import { ItemController } from '../controllers/item.controller';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [PostgresSQLModule, MessagingModule],
  controllers: [ItemController],
  providers: [ItemService, CategoryService, SellerService],
  exports: [ItemService, CategoryService, SellerService],
})
export class PersistenceModule {}
