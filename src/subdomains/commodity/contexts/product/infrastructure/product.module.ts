import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PersistenceModule } from './persistence/persistence.module';
import { ObjectValueExceptionFilter } from './utils/exception-filters/object-value.exception.filters';
@Module({
  imports: [PersistenceModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ObjectValueExceptionFilter,
    },
  ],
})
export class ProductModule {}
