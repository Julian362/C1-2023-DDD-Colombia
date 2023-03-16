import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { CreatedItemPublisher } from './publisher/created-item.event-publisher';
import { GotItemPublisher } from './publisher/got-item.event-publisher';
import { GotSellerPublisher } from './publisher/got-seller.event-publisher';
import { GotCategoryPublisher } from './publisher/got-category.event-publisher';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_CONTEXT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    CreatedItemPublisher,
    GotItemPublisher,
    GotSellerPublisher,
    GotCategoryPublisher,
  ],
  exports: [
    CreatedItemPublisher,
    GotItemPublisher,
    GotSellerPublisher,
    GotCategoryPublisher,
  ],
})
export class MessagingModule {}
