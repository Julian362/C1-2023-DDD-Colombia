import { ItemAggregateRoot } from '@context/product/domain/aggregates';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { ProductModule } from './subdomains/commodity/contexts/product/infrastructure/product.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
