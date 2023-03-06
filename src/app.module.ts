import { Module } from '@nestjs/common';
import { NameValueObject } from './subdomains/commodity/contexts/product/domain/value-objects/category';

@Module({
  imports: [],
  controllers: [],
  providers: [NameValueObject],
})
export class AppModule {}
