import { Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ItemPostgresService } from './services/item-postgres.service';
import { SellerPostgresService } from './services/seller-postgres.service';
import { CategoryPostgresService } from './services/category-postgres.service';
import { ItemPostgresEntity } from './entities/item-postgres.entity';

@Controller('postgres')
export class PostgresController {
  constructor(
    private readonly configService: ConfigService,
    private readonly itemPostgresService: ItemPostgresService,
    private readonly categoryPostgresService: CategoryPostgresService,
    private readonly sellerPostgresService: SellerPostgresService,
  ) {}

  @Post('create')
  createItem() {
    const item = new ItemPostgresEntity({
      itemId: '487db80c-5b7d-458c-8f81-c0a365cf41f1',
      name: 'item',
      description: 'description',
      price: 100,
    });
    return this.itemPostgresService.createItem(item);
  }
}
