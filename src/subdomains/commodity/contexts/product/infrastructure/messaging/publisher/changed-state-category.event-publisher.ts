import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from '@sofka';
import { lastValueFrom } from 'rxjs';
import { CategoryEntity } from '../../persistence/entities/category.entity';
import { ChangedStateEventPublisher } from '@context/product/domain/events';
@Injectable()
export class ChangedStatePublisher extends ChangedStateEventPublisher {
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
