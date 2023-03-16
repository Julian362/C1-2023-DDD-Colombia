import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { ItemEntity } from '../../persistence/entities/item.entity';
import { ChangedDescriptionCategoryEventPublisher } from '../../../domain/events/publishers/changed-description-category.event-publisher';
import { CategoryEntity } from '../../persistence/entities/category.entity';
import { CreatedCategoryEventPublisher } from '@context/product/domain/events/publishers/created-category.event-publisher';
@Injectable()
export class CreatedCategoryPublisher extends CreatedCategoryEventPublisher {
  constructor(@Inject('PRODUCT_CONTEXT') private readonly proxy: ClientProxy) {
    super(proxy as unknown as IEventPublisher);
  }

  emit<Result = any, Input = CategoryEntity>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return lastValueFrom(this.proxy.emit(pattern, data));
  }
}
