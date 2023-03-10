import { Module } from '@nestjs/common';
import { NameCategoryValueObject } from './subdomains/commodity/contexts/product/domain/value-objects/category';

@Module({
  imports: [],
  controllers: [],
  providers: [NameCategoryValueObject],
})
export class AppModule {}
