import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MessagingModule } from './messaging/messaging.module';
import { PersistenceModule } from './persistence/persistence.module';
import { ObjectValueExceptionFilter } from './utils/exception-filters/object-value.exception.filter';
import { ItemController } from './controllers/item.controller';
import { SellerController } from './controllers/seller.controller';
import { CategoryController } from './controllers/category.controller';
import { HttpModule } from '@nestjs/axios';
import { NotFoundExceptionFilter } from './utils/exception-filters/not-found.exception-filter';
import { GetDataOutContextService } from './services/get-data-out-context.service';
import { OutContextController } from './controllers/OutContextController';
import { TypeOrmExceptionFilter } from './utils/exception-filters/bd.exception-filter';
@Module({
  imports: [PersistenceModule, MessagingModule, HttpModule],
  controllers: [
    ItemController,
    CategoryController,
    SellerController,
    OutContextController,
  ],
  providers: [
    GetDataOutContextService,
    {
      provide: APP_FILTER,
      useClass: ObjectValueExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
  ],
})
export class ProductModule {}
