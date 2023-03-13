import { ItemAggregateRoot } from '@context/product/domain/aggregates';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [ItemAggregateRoot],
})
export class AppModule {}
