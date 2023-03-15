import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CategoryService } from './services/category.service';
import { ItemService } from './services/item.service';
import { SellerService } from './services/seller.service';

@Controller('postgres')
export class PostgresController {
  constructor(
    private readonly configService: ConfigService,
    private readonly itemService: ItemService,
    private readonly categoryService: CategoryService,
    private readonly sellerService: SellerService,
  ) {}

  @Post('create')
  createItem() {
    const item = {
      name: 'item',
      description: 'item description',
      price: 1000,
      image: 'image',
    };
    return this.itemService.createItem(item);
  }
}
