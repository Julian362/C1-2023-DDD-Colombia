import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { ChangedDescriptionCategoryPublisher } from './publisher/changed-description-category.event-publisher';
import { CreatedItemPublisher } from './publisher/created-item.event-publisher';

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
  providers: [CreatedItemPublisher],
  exports: [CreatedItemPublisher],
})
export class MessagingModule {}
