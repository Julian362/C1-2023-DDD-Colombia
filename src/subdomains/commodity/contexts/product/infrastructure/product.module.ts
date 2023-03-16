import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MessagingModule } from './messaging/messaging.module';
import { PersistenceModule } from './persistence/persistence.module';
import { ObjectValueExceptionFilter } from './utils/exception-filters/object-value.exception.filters';
import { ItemController } from './controllers/item.controller';
import { SellerController } from './controllers/seller.controller';
import { CategoryController } from './controllers/category.controller';
@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [ItemController, CategoryController, SellerController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ObjectValueExceptionFilter,
    },
  ],
})
export class ProductModule {}
